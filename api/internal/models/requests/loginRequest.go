package requests

type LoginRequest struct{
	Email string `binding:"required"`
	Password string `binding:"required"`
}