package entities

type Anime struct {
	Id uint `json:"id" gorm:"primaryKey"`
	Title string `json:"title"`
	Synopsis string `json:"synopsis"`
}