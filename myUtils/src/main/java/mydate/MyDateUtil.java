package mydate;

import org.apache.commons.lang3.StringUtils;

import java.text.SimpleDateFormat;
import java.time.DateTimeException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class MyDateUtil {
    public static final String PATTERN_DATE = "yyyy-MM-dd";
    public static final String PATTERN_yyyyMMdd = "yyyy/MM/dd";
    public static final String PATTERN_MMddyyyy = "MM/dd/yyyy";
    public static final String PATTERN_DATEMINUTE = "yyyy-MM-dd HH:mm";
    public static final String PATTERN_DATEMINUTE_BIAS = "yyyy/MM/dd HH:mm";
    public static final String PATTERN_DATETIME = "yyyy-MM-dd HH:mm:ss";
    public static final String PATTERN_DATETIME_BIAS = "yyyy/MM/dd HH:mm:ss";
    public static final String PATTERN_HOURMINUTE = "HH:mm";
    public static final String PATTERN_DATE_NOTAG = "yyyyMMdd";
    public static final String PATTERN_DATETIME_NOTAG = "yyyyMMddHHmmss";
    public static final String PATTERN_DATETIME_SECOND_NOTAG = "yyyyMMddHHmmssSSSS";
    public static final int DAY_HOUR = 24;
    public static final int DAY_MINUTE = 60;
    public static final int DAY_SECOND = 60;
    public static final int DAY_TOTAL_SECOND = 86400;
    public static final Long DAY_TOTAL_MILLISECOND = 86400000L;
    public static final TimeZone TIMEZONE_BEIJING = TimeZone.getTimeZone("GMT+08:00");

    public static String getDateStr(String dateFormat) {
        LocalDateTime arrivalDate = LocalDateTime.now();
        try {
            if (StringUtils.isBlank(dateFormat)) {
                dateFormat = "yyyy-MM-dd HH:mm:ss";
            }
            DateTimeFormatter format = DateTimeFormatter.ofPattern(dateFormat);
            String landing = arrivalDate.format(format);
            return landing;
        } catch (DateTimeException ex) {
            ex.printStackTrace();
        }
        return null;
    }


    private static final ThreadLocal<SimpleDateFormat> threadLocal_MMddyyyy = new ThreadLocal<SimpleDateFormat>() {
        protected synchronized SimpleDateFormat initialValue() {
            return new SimpleDateFormat("MM/dd/yyyy");
        }
    };
    private static final ThreadLocal<SimpleDateFormat> threadLocal_yyyyMMdd = new ThreadLocal<SimpleDateFormat>() {
        protected synchronized SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyy/MM/dd");
        }
    };
    private static final ThreadLocal<SimpleDateFormat> threadLocal_date = new ThreadLocal<SimpleDateFormat>() {
        protected synchronized SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyy-MM-dd");
        }
    };
    private static final ThreadLocal<SimpleDateFormat> threadLocal_dateTime = new ThreadLocal<SimpleDateFormat>() {
        protected synchronized SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        }
    };
    private static final ThreadLocal<SimpleDateFormat> threadLocal_dateTime_bias = new ThreadLocal<SimpleDateFormat>() {
        protected synchronized SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        }
    };
    private static final ThreadLocal<SimpleDateFormat> threadLocal_dateMinute = new ThreadLocal<SimpleDateFormat>() {
        protected synchronized SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyy-MM-dd HH:mm");
        }
    };
    private static final ThreadLocal<SimpleDateFormat> threadLocal_dateMinute_bias = new ThreadLocal<SimpleDateFormat>() {
        protected synchronized SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyy/MM/dd HH:mm");
        }
    };
    private static final ThreadLocal<SimpleDateFormat> threadLocal_hourMinute = new ThreadLocal<SimpleDateFormat>() {
        protected synchronized SimpleDateFormat initialValue() {
            return new SimpleDateFormat("HH:mm");
        }
    };
    private static final ThreadLocal<SimpleDateFormat> threadLocal_date_notag = new ThreadLocal<SimpleDateFormat>() {
        protected synchronized SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyyMMdd");
        }
    };
    private static final ThreadLocal<SimpleDateFormat> threadLocal_datetime_notag = new ThreadLocal<SimpleDateFormat>() {
        protected synchronized SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyyMMddHHmmss");
        }
    };
    private static final ThreadLocal<SimpleDateFormat> threadLocal_datetime_second_notag = new ThreadLocal<SimpleDateFormat>() {
        protected synchronized SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyyMMddHHmmssSSSS");
        }
    };

    public MyDateUtil() {
    }

    public static SimpleDateFormat getSimpleDateFormat2Date() {
        return (SimpleDateFormat)threadLocal_date.get();
    }

    public static SimpleDateFormat getSimpleDateFormat2yyyyMMdd() {
        return (SimpleDateFormat)threadLocal_yyyyMMdd.get();
    }

    public static SimpleDateFormat getSimpleDateFormat2MMddyyyy() {
        return (SimpleDateFormat)threadLocal_MMddyyyy.get();
    }

    public static SimpleDateFormat getSimpleDateFormat2DateTime() {
        return (SimpleDateFormat)threadLocal_dateTime.get();
    }

    public static SimpleDateFormat getSimpleDateFormat2DateMinute() {
        return (SimpleDateFormat)threadLocal_dateMinute.get();
    }

    public static SimpleDateFormat getSimpleDateFormat2DateTimeBias() {
        return (SimpleDateFormat)threadLocal_dateTime_bias.get();
    }

    public static SimpleDateFormat getSimpleDateFormat2DateMinuteBias() {
        return (SimpleDateFormat)threadLocal_dateMinute_bias.get();
    }

    public static SimpleDateFormat getSimpleDateFormat2HourMinute() {
        return (SimpleDateFormat)threadLocal_hourMinute.get();
    }

    public static SimpleDateFormat getSimpleDateFormat2DateNoTag() {
        return (SimpleDateFormat)threadLocal_date_notag.get();
    }

    public static SimpleDateFormat getSimpleDateFormat2DateSecondNoTag() {
        return (SimpleDateFormat)threadLocal_datetime_second_notag.get();
    }

    public static SimpleDateFormat getSimpleDateFormat2DateTimeNoTag() {
        return (SimpleDateFormat)threadLocal_datetime_notag.get();
    }

    public static Date getToday() {
        return new Date();
    }

    public static int getTodayYear() {
        return getYear(getToday());
    }

    public static int getYear(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        return cal.get(1);
    }

    public static int getTodayMonth() {
        return getMonth(getToday());
    }

    public static int getMonth(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        return cal.get(2);
    }

    public static int getTodayDate() {
        return getDate(getToday());
    }

    public static int getDate(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        return cal.get(5);
    }

    public static Date addDate(Date date, int day) {
        return addDateByType(date, 5, day);
    }

    public static Date addMonth(Date date, int month) {
        return addDateByType(date, 2, month);
    }

    public static Date addYear(Date date, int year) {
        return addDateByType(date, 1, year);
    }

    public static int diffDay(Date date1, Date date2) {
        if (date1 != null && date2 != null) {
            long date1Time = date1.getTime();
            long date2Time = date2.getTime();
            return Math.abs((int)((date1Time - date2Time) / DAY_TOTAL_MILLISECOND));
        } else {
            return 0;
        }
    }

    public static Date addDateByType(Date date, int type, int add) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(type, add);
        return cal.getTime();
    }

    public static String getTodayDateString() {
        return getDateString(getToday());
    }
    public static String getTomorrowDateString() {
      Date date=  addDate(getToday(),1);
        return getDateString(date);
    }

    public static String getTodayDateMinute() {
        return date2String(getToday(), "yyyy-MM-dd HH:mm");
    }

    public static String getTodayDateTime() {
        return date2String(getToday(), "yyyy-MM-dd HH:mm:ss");
    }

    public static String getDateString(Date date) {
        return date2String(date, "yyyy-MM-dd");
    }
    public static String getDateAndTime(Date date) {
        return date2String(date, "yyyy-MM-dd HH:mm:ss");
    }

    public static String date2String(Date date, String pattern) {
        return date != null && pattern != null ? getSimpleDateFormat(pattern).format(date) : null;
    }

    public static String date2String(Date date, String pattern, String nowTimeZone, String targetTimeZone) {
        if (date != null && pattern != null) {
            SimpleDateFormat dateFormat;
            if (StringUtils.equals(nowTimeZone, targetTimeZone)) {
                dateFormat = new SimpleDateFormat(pattern);
                dateFormat.setTimeZone(getTimeZone(nowTimeZone));
                return dateFormat.format(date);
            } else {
                dateFormat = new SimpleDateFormat(pattern);
                String dateString = dateFormat.format(date);
                dateFormat.setTimeZone(getTimeZone(nowTimeZone));
                Date afterDate = null;

                try {
                    afterDate = dateFormat.parse(dateString);
                } catch (Exception var8) {
                    ;
                }

                dateFormat.setTimeZone(getTimeZone(targetTimeZone));
                return dateFormat.format(afterDate);
            }
        } else {
            return null;
        }
    }

    public static Date getDateByZone(Date date, String nowTimeZone, String targetTimeZone) {
        if (date == null) {
            return null;
        } else if (StringUtils.equals(nowTimeZone, targetTimeZone)) {
            return date;
        } else {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            sdf.setTimeZone(getTimeZone(targetTimeZone));
            Calendar calendar = Calendar.getInstance(getTimeZone(nowTimeZone));
            calendar.setTime(date);
            String tgtDateStr = sdf.format(calendar.getTime());
            SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date afterDate = null;

            try {
                afterDate = sdf2.parse(tgtDateStr);
            } catch (Exception var9) {
                ;
            }

            return afterDate;
        }
    }

    public static TimeZone getTimeZone(String zone) {
        return TimeZone.getTimeZone(zone);
    }

    public static Date dateString2Date(String dateString) {
        return string2Date(dateString, "yyyy-MM-dd");
    }

    public static Date dateString3Date(String dateString) {
        return string2Date(dateString, "yyyy-MM-dd HH:mm:ss");
    }

    public static Date dateString2Date(String dateString, String nowTimeZone, String targetTimeZone) {
        return dateString2Date(dateString, "yyyy-MM-dd", nowTimeZone, targetTimeZone);
    }

    public static Date dateString2Date(String dateString, String pattern, String nowTimeZone, String targetTimeZone) {
        Date date = dateString2DateByZone(dateString, pattern, nowTimeZone);
        return getDateByZone(date, nowTimeZone, targetTimeZone);
    }

    public static Date dateString2DateByZone(String dateString, String pattern, String timeZone) {
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        sdf.setTimeZone(getTimeZone(timeZone));
        Date date = null;

        try {
            date = sdf.parse(dateString);
        } catch (Exception var6) {
            ;
        }

        return date;
    }

    public static String dateString2String(String dateString, String pattern, String nowTimeZone, String targetTimeZone) {
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        sdf.setTimeZone(getTimeZone(nowTimeZone));
        Date afterDate = null;

        try {
            afterDate = sdf.parse(dateString);
        } catch (Exception var7) {
            ;
        }

        sdf.setTimeZone(getTimeZone(targetTimeZone));
        return sdf.format(afterDate);
    }

    public static Date string2Date(String dateString, String... patterns) {
        if (dateString != null && !"".equals(dateString.trim()) && patterns != null && patterns.length != 0) {
            SimpleDateFormat df = null;
            String[] var3 = patterns;
            int var4 = patterns.length;

            for(int var5 = 0; var5 < var4; ++var5) {
                String pattern = var3[var5];

                try {
                    df = getSimpleDateFormat(pattern);
                    if (df != null) {
                        return df.parse(dateString);
                    }
                } catch (Exception var8) {
                    ;
                }
            }

            return null;
        } else {
            return null;
        }
    }

    public static Date convertDateByLocalDateTime(LocalDateTime localDateTime) {
        ZoneId zone = ZoneId.systemDefault();
        Instant instant = localDateTime.atZone(zone).toInstant();
        Date date = Date.from(instant);
        return date;
    }

    private static SimpleDateFormat getSimpleDateFormat(String pattern) {
        if (pattern != null) {
            if ("yyyy-MM-dd".equals(pattern)) {
                return getSimpleDateFormat2Date();
            } else if ("yyyy-MM-dd HH:mm:ss".equals(pattern)) {
                return getSimpleDateFormat2DateTime();
            } else if ("yyyy-MM-dd HH:mm".equals(pattern)) {
                return getSimpleDateFormat2DateMinute();
            } else if ("yyyyMMdd".equals(pattern)) {
                return getSimpleDateFormat2DateNoTag();
            } else if ("yyyyMMddHHmmss".equals(pattern)) {
                return getSimpleDateFormat2DateTimeNoTag();
            } else if ("HH:mm".equals(pattern)) {
                return getSimpleDateFormat2HourMinute();
            } else {
                return "MM/dd/yyyy".equals(pattern) ? getSimpleDateFormat2MMddyyyy() : new SimpleDateFormat(pattern);
            }
        } else {
            return null;
        }
    }

}