package com.burgerhut.exception;

public class InvalidDataException extends RuntimeException {

    public InvalidDataException(String message) {
        super(message);
    }

    // Optionally, you can add constructors with different parameter types, like cause
    public InvalidDataException(String message, Throwable cause) {
        super(message, cause);
    }
}
