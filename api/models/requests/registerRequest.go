package requests

type RegisterRequest struct {
	FirstName       string `binding:"required"`
	LastName        string `binding:"required"`
	Email           string `binding:"required"`
	Password        string `binding:"required"`
	ConfirmPassword string `binding:"required"`
}
