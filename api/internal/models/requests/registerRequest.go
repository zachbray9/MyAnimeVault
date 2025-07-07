package requests

type RegisterRequest struct {
	Email           string `binding:"required"`
	Password        string `binding:"required"`
	ConfirmPassword string `binding:"required"`
}
