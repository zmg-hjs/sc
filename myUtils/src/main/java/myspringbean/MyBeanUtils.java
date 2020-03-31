package myspringbean;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.FatalBeanException;
import org.springframework.lang.Nullable;
import org.springframework.util.Assert;
import org.springframework.util.ClassUtils;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Supplier;

import static org.springframework.beans.BeanUtils.getPropertyDescriptor;
import static org.springframework.beans.BeanUtils.getPropertyDescriptors;

public class MyBeanUtils {

    public static <S, T> T copyPropertiesAndResTarget(S source, Supplier<T> supplier) {

        T target = supplier.get();
        BeanUtils.copyProperties(source, target);
        return target;
    }

    public static <S, T> T copyPropertiesAndResTarget(S source, Supplier<T> supplier, Consumer<T> consumer) {
        T target = copyPropertiesAndResTarget(source, supplier);
        consumer.accept(target);
        return target;
    }

    public static void copyProperties(Object source, Object target, String... ignoreProperties) throws BeansException {
        copyProperties(source, target, (Class) null, ignoreProperties);
    }

    public static void copyProperties(Object source, Object target) throws BeansException {
        copyProperties(source, target, null, (String[]) null);
    }

    private static void copyProperties(Object source, Object target, @Nullable Class<?> editable,
                                       @Nullable String... ignoreProperties) throws BeansException {

        Assert.notNull(source, "Source must not be null");
        Assert.notNull(target, "Target must not be null");

        Class<?> actualEditable = target.getClass();
        if (editable != null) {
            if (!editable.isInstance(target)) {
                throw new IllegalArgumentException("Target class [" + target.getClass().getName() +
                        "] not assignable to Editable class [" + editable.getName() + "]");
            }
            actualEditable = editable;
        }

        // 获取target对象的PropertyDescriptor属性数组targetPds
        PropertyDescriptor[] targetPds = getPropertyDescriptors(actualEditable);
        List<String> ignoreList = (ignoreProperties != null ? Arrays.asList(ignoreProperties) : null);

        // 遍历target对象属性
        for (PropertyDescriptor targetPd : targetPds) {
            // 获取其setter方法
            Method writeMethod = targetPd.getWriteMethod();
            //获取源对象的读取方法
            Method targetReadMethod = targetPd.getReadMethod();
            if (writeMethod != null && (ignoreList == null || !ignoreList.contains(targetPd.getName()))) {
                // 获取source对象与target对象targetPd属性同名的PropertyDescriptor对象sourcePd
                PropertyDescriptor sourcePd = getPropertyDescriptor(source.getClass(), targetPd.getName());
                if (sourcePd != null) {
                    // 获取source对应属性的getter方法
                    Method readMethod = sourcePd.getReadMethod();
                    if (readMethod != null &&
                            // 判断是否可赋值，如上述例子：desk是DeskVO、DeskDO，返回false；而chairs都是List<?>，返回true
                            ClassUtils.isAssignable(writeMethod.getParameterTypes()[0], readMethod.getReturnType())) {
                        try {
                            if (!Modifier.isPublic(readMethod.getDeclaringClass().getModifiers())) {
                                readMethod.setAccessible(true);
                            }
                            // 通过反射获取source对象属性的值
                            Object sourceValue = readMethod.invoke(source);
                            if (!Modifier.isPublic(writeMethod.getDeclaringClass().getModifiers())) {
                                writeMethod.setAccessible(true);
                            }
                            Object targerValue = targetReadMethod.invoke(target);
                            if (targerValue != null || sourceValue == null) continue;
                            writeMethod.invoke(target, sourceValue);
                        } catch (Throwable ex) {
                            throw new FatalBeanException(
                                    "Could not copy property '" + targetPd.getName() + "' from source to target", ex);
                        }
                    }
                }
            }
        }
    }
}
