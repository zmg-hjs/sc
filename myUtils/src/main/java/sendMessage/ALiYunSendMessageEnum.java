package sendMessage;

public enum ALiYunSendMessageEnum {
    SUCCESS("success","OK");
    private String name;
    private String status;

    ALiYunSendMessageEnum(String status, String name) {
        this.status = status;
        this.name = name;
    }

    public String getName() {
        return name;
    }
    public String getStatus() {
        return status;
    }
}
