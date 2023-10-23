package com.backend.project.model;

public enum LanguageEnum {
    ENGLISH("English"),
    SPANISH("Spanish"),
    CHINESE("Chinese"),
    FRENCH("French"),
    GERMAN("German"),
    RUSSIAN("Russian"),
    JAPANESE("Japanese"),
    PORTUGUESE("Portuguese"),
    ARABIC("Arabic"),
    KOREAN("Korean"),
    ITALIAN("Italian"),
    DUTCH("Dutch"),
    SWEDISH("Swedish"),
    TURKISH("Turkish"),
    GREEK("Greek"),
    HINDI("Hindi"),
    POLISH("Polish"),
    FINNISH("Finnish"),
    DANISH("Danish"),
    NORWEGIAN("Norwegian");

    private final String language;

    LanguageEnum(String language) {
        this.language = language;
    }

    public String getLanguage() {
        return language;
    }




    @Override
    public String toString() {
        return "LanguageEnum{" +
                "language='" + language + '\'' +
                '}';
    }
}
