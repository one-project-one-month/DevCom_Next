# Create Post API Contract

This folder defines frontend/backend contracts for post creation.

## Endpoints

- `POST /api/v1/uploads/images` -> upload one optional image
- `POST /api/v1/posts/drafts` -> save draft
- `POST /api/v1/posts` -> publish post
- `GET /api/v1/posts/:id` -> fetch post detail

## Notes

- Visibility is always `PUBLIC` in current product rules.
- Image is optional and only one image is allowed.
- API should always return `requestId` for debugging/tracing.
