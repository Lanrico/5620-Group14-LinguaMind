package com.backend.project.model;

public enum LanguageEnum {
    ENGLISH("ENGLISH"),
    SPANISH("SPANISH"),
    CHINESE("CHINESE"),
    FRENCH("FRENCH"),
    GERMAN("GERMAN"),
    RUSSIAN("RUSSIAN"),
    JAPANESE("JAPANESE"),
    PORTUGUESE("PORTUGUESE"),
    ARABIC("ARABIC"),
    KOREAN("KOREAN"),
    ITALIAN("ITALIAN"),
    DUTCH("DUTCH"),
    SWEDISH("SWEDISH"),
    TURKISH("TURKISH"),
    GREEK("GREEK"),
    HINDI("HINDI"),
    POLISH("POLISH"),
    FINNISH("FINNISH"),
    DANISH("DANISH"),
    NORWEGIAN("NORWEGIAN");

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
