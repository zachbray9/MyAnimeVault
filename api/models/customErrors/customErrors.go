package customErrors

import "errors"

var (
	ErrNotFound = errors.New("not_found")
)