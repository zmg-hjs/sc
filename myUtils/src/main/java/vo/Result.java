package vo;

import enums.ResultEnum;
import lombok.Getter;
import lombok.ToString;

import java.io.Serializable;

/**
 * 返回值：
 * code = -2 代表系统原因错误，一般是不会出现这种情况的(例如，数据库连接错误)，请一定要查看message
 * code = -1 代表失败(失败情况下一般会返回：-1)
 * code = 0  代表默认状态,也代表失败，但是正常情况下是不会出现的,如果出现，那么就是逻辑可能有问题
 * code = 1  代表成功
 * 最外层的getCode()，getMessage()方法不能设置为 private,否则在任何转json字符串的地方会导致属性输出错误
 *
 * @param <T> 泛型
 */
@ToString
@Getter
public class Result<T> implements Serializable {
    private String success;
    private String fail;
    private int code = ResultEnum.DEFAULT.getCode(); //返回码
    private String message = ResultEnum.DEFAULT.getMessage();
    private T data = null;
    private String customMessage = "";//自定义返回信息,一般情况下用不到这个属性
    private Long count;

    public Result setCustomMessage(String customMessage) {
        this.customMessage = customMessage;
        return this;
    }

    public Long getCount() {
        return count;
    }

    public Result<T> setCount(Long count) {
        this.count = count;
        return this;
    }
    public Result<T> setSuccess(T data) {
        return this.setCode(ResultEnum.SUCCESS.code).setMessage(ResultEnum.SUCCESS.getMessage()).setData(data);
    }

    public Result<T> setPageSuccess(T data, Long count) {
        return this.setCode(ResultEnum.SUCCESS.code).setMessage(ResultEnum.SUCCESS.getMessage()).setData(data).setCount(count);
    }

    public Result<T> setSuccess(String message, T data) {
        return setSuccess(data).setMessage(message);
    }

    public Result<T> setFail(String message) {
        return this.setCode(ResultEnum.FAIL.code).setMessage(message);
    }

    public Result<T> setSystemFail(String message) {
        return this.setCode(ResultEnum.FAILMESSAGE_SYSTEM_ERROR.code).setMessage(message);
    }

    public Result<T> setFail(String message, T data) {
        return setFail(message).setData(data);
    }

    public Result<T> setFail(String message, T data, Long count) {
        setCount(count);
        return setFail(message).setData(data);
    }


    public static Result createSimpleSuccessResult() {
        Result result = new Result();
        result.setCode(ResultEnum.SUCCESS.getCode());
        result.setMessage(ResultEnum.SUCCESS.getMessage());
        return result;
    }

    /**
     * 创建一个简单失败的结果
     *
     * @return
     */
    public static Result createSimpleFailResult() {
        Result result = new Result();
        result.setCode(ResultEnum.FAIL.getCode());
        result.setMessage(ResultEnum.FAIL.getMessage());
        return result;
    }

    /**
     * 创建一个系统错误的结果（该结果正常情况下是不会出现的，一般是写代码有问题）
     *
     * @return
     */
    public static Result createSystemErrorResult() {
        Result result = new Result();
        result.setCode(ResultEnum.FAIL.getCode());
        result.setMessage(ResultEnum.FAILMESSAGE_SYSTEM_ERROR.getMessage());
        return result;
    }


    private Result setMessage(String message) {
        this.message = message;
        return this;
    }

    public T getData() {
        return data;
    }

    private Result setData(T data) {
        this.data = data;
        return this;
    }


    private Result setCode(int code) {
        this.code = code;
        return this;
    }


    /**
     * 设置默认状态
     */
    private void setDefault() {
        this.setCode(ResultEnum.DEFAULT.getCode());
        this.setMessage(ResultEnum.DEFAULT.getMessage());
        this.setData(data);
    }


    /**
     * @param code    返回码
     * @param data    返回的数据
     * @param message 信息
     * @author tsxxdw
     * 2018
     */
    public Result(int code, T data, String message) {
        this.code = code;
        this.data = data;
        this.message = message;
    }

    public Result() {
        setDefault();
    }

    public boolean isSuccess() {
        if (this.code == ResultEnum.SUCCESS.getCode()) {
            return true;
        } else {
            return false;
        }
    }

    public boolean isFail() {
        return !isSuccess();
    }

    public boolean isSystemError() {
        return this.code == -2;
    }

}