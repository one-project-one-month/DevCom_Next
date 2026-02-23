# Backend API Requirements: Create Post

## Folder structure

- `app/create-post/_api/contracts.ts`: TypeScript contracts used by frontend
- `app/create-post/_api/README.md`: quick endpoint summary
- `docs/backend/create-post/endpoints.md`: backend implementation guide

## 1) Upload image (optional)

### Request
- Method: `POST`
- Path: `/api/v1/uploads/images`
- Content-Type: `multipart/form-data`
- Field: `file` (single image only)

### Success response (200)
```json
{
  "ok": true,
  "data": {
    "imageId": "img_01JXYZ",
    "imageUrl": "https://cdn.example.com/uploads/img_01JXYZ.webp",
    "width": 1200,
    "height": 630,
    "mimeType": "image/webp",
    "sizeBytes": 182340
  },
  "meta": { "requestId": "req_abc123" }
}
```

### Validation errors
- Unsupported type (only png/jpg/webp)
- Too large file
- More than one file

## 2) Save draft

### Request
- Method: `POST`
- Path: `/api/v1/posts/drafts`
- Body:
```json
{
  "title": "How to optimize React Query cache keys",
  "body": "My current issue and context...",
  "format": "Question",
  "tags": ["react-query", "performance"],
  "communityId": "frontend",
  "notifyReplies": true,
  "notifyMentions": true,
  "imageId": "img_01JXYZ"
}
```

### Success response (201)
- Returns `post` entity with `status: "DRAFT"`.

## 3) Publish post

### Request
- Method: `POST`
- Path: `/api/v1/posts`
- Body: same as draft request

### Backend validation rules
- title: 8..120 chars
- body: minimum 30 chars
- tags: 1..5
- visibility: always PUBLIC (server-side enforced)

### Success response (201)
- Returns `post` entity with `status: "PUBLISHED"` and `publishedAt`.

## 4) Get post detail

### Request
- Method: `GET`
- Path: `/api/v1/posts/:id`

### Success response (200)
- Returns full `post` entity for detail view.

## Error response format (all endpoints)

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "fields": [
      { "field": "title", "message": "Title must be between 8 and 120 characters" }
    ],
    "requestId": "req_abc123"
  }
}
```

## Required post response shape

```json
{
  "id": "post_01JXYZ",
  "title": "How to optimize React Query cache keys",
  "body": "Post body text",
  "format": "Question",
  "status": "PUBLISHED",
  "visibility": "PUBLIC",
  "tags": ["react-query", "performance"],
  "communityId": "frontend",
  "imageUrl": "https://cdn.example.com/uploads/img_01JXYZ.webp",
  "createdAt": "2026-02-23T08:10:00.000Z",
  "updatedAt": "2026-02-23T08:10:00.000Z",
  "publishedAt": "2026-02-23T08:10:00.000Z",
  "author": {
    "id": "usr_01",
    "name": "H.Hlaing Swan",
    "handle": "@hhlaing.swan",
    "avatarUrl": "https://cdn.example.com/avatars/usr_01.png"
  },
  "stats": {
    "replies": 0,
    "helpful": 0,
    "saves": 0
  }
}
```
