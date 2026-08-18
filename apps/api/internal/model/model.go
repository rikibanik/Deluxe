package model

import "time"

type UserStatus string

const (
	UserStatusPending   UserStatus = "pending"
	UserStatusActive    UserStatus = "active"
	UserStatusSuspended UserStatus = "suspended"
	UserStatusDeleted   UserStatus = "deleted"
)

type User struct {
	ID            string     `json:"id"`
	Username      string     `json:"username"`
	Email         string     `json:"email"`
	EmailVerified bool       `json:"email_verified"`
	DisplayName   *string    `json:"display_name,omitempty"`
	Status        UserStatus `json:"status"`
	CreatedAt     time.Time  `json:"created_at"`
}

type RepoVisibility string

const (
	VisibilityPublic  RepoVisibility = "public"
	VisibilityPrivate RepoVisibility = "private"
)

type Repository struct {
	ID            string         `json:"id"`
	OwnerID       string         `json:"owner_id"`
	Name          string         `json:"name"`
	Description   *string        `json:"description,omitempty"`
	Visibility    RepoVisibility `json:"visibility"`
	DefaultBranch string         `json:"default_branch"`
	StoragePath   string         `json:"-"`
	IsEmpty       bool           `json:"is_empty"`
	SizeBytes     int64          `json:"size_bytes"`
	PushedAt      *time.Time     `json:"pushed_at,omitempty"`
	CreatedAt     time.Time      `json:"created_at"`
}
