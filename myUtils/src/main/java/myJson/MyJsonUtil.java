package myJson;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class MyJsonUtil {

    private static ObjectMapper objectMapper;

    /**
     * 对象转换为json
     * @param data
     * @return
     */
    public static String toJson(Object data) {
        try {
            objectMapper=new ObjectMapper();
            String value = objectMapper.writeValueAsString(data);
            return value;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * json转换为对象
     * @param jsonData
     * @param beanType
     * @param <T>
     * @return
     */
    public static <T> T jsonToPojo(String jsonData, Class<T> beanType) {
        try {
            objectMapper=new ObjectMapper();
            T t = objectMapper.readValue(jsonData, beanType);
            return t;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * json转换为List<T>对象
     * @param jsonData
     * @param beanType
     * @param <T>
     * @return
     */
    public static <T> List<T> jsonToList(String jsonData, Class<T> beanType) {
        try {
            objectMapper=new ObjectMapper();
            JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, beanType);
            List<T> list = objectMapper.readValue(jsonData, javaType);
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }



}
