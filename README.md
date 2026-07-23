# Getting started

```
cd server
dotnet run
```

> NOTE: the application will seed 25 todo tasks automatically into an sqlite DB.

```
cd client
npm start
```

Navigate to http://localhost:4200

## Things I would do if given more time
- I would add navigation to movile version
- I would have liked to add validation in the task form on the client side
- right now TodoService.ValidateAndNormalizeTitle hand-rolls validation and throws a custom exception. I'd move to FluentValidation or DataAnnotations on the DTOs.
- GetAllAsync and GetCompletedAsync in TodoService.cs are basically identical (paging, projection). I'd combined it into one method with a filter query param.
- I would use automapper or mapperly to map the Dtos as the codebase scales
- I'd include some authentication logic
- I'd add some logging using serilog or some other helpful logging tool
- I'd add an audit table to audit actions on Todo tasks
- I'd add a PATCH endpoint to be able to edit Todo items

☺️ Happing judging