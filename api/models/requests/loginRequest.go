package requests

type LoginRequest struct{
	UserName string `binding:"required"`
	Password string `binding:"required"`
}