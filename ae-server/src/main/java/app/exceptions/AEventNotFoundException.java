package app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * This method <description of functionality>
 *
 * @outhor redouanassakali
 */
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public class AEventNotFoundException extends RuntimeException {
        public AEventNotFoundException(String message) {
            super("AEvent not found. " + message);
        }

}
