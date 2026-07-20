namespace server.Exceptions;

public class TodoValidationException(string message) : ValidationException(message);
