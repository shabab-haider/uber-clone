# User Registration API

## Endpoint

`POST /user/register`

## Description

Registers a new user in the system.  
Validates the input data and returns an authentication token on success.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstname`: **String**, required, minimum 3 characters
- `fullname.lastname`: **String**, required, minimum 3 characters
- `email`: **String**, required, must be a valid email address
- `password`: **String**, required

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john@example.com"
      // ...other fields
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "error": [
      {
        "type": "field",
        "msg": "The firstname must be 3 characters long",
        "path": "fullname.firstname",
        "location": "body"
      },
      {
        "type": "field",
        "msg": "email is not valid",
        "path": "email",
        "location": "body"
      }
    ]
  }
  ```

### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "Error message"
  }
  ```

## Example Request

```bash
curl -X POST http://localhost:4000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "yourpassword"
  }'
```

---

# User Login API

## Endpoint

`POST /user/login`

## Description

Authenticates a user and returns a JWT token if credentials are valid.

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email`: **String**, required, must be a valid email address
- `password`: **String**, required, minimum 6 characters

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john@example.com"
      // ...other fields
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "error": [
      {
        "type": "field",
        "msg": "invalid email",
        "path": "email",
        "location": "body"
      },
      {
        "type": "field",
        "msg": "invalid password",
        "path": "password",
        "location": "body"
      }
    ]
  }
  ```

### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "error": "invalid username or password"
  }
  ```

### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "Error message"
  }
  ```

## Example Request

```bash
curl -X POST http://localhost:4000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "yourpassword"
  }'
```