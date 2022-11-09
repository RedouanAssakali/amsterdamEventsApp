package app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * This method <description of functionality>
 *
 * @outhor redouanassakali
 */

@ResponseStatus(HttpStatus.PRECONDITION_FAILED)
public class PreConditionFailed extends RuntimeException {
    public PreConditionFailed(String message) {
        super(message);
    }

}
