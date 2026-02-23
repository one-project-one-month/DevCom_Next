# Profile Route Structure (Example Pattern)

This route is organized as a feature module.

## Folder layout

- `app/profile/page.tsx`: route entry only
- `app/profile/_types.ts`: route-owned types
- `app/profile/_data/profile.mock.ts`: route-owned mock data
- `app/profile/_components/profile-page-view.tsx`: route composition
- `app/profile/_components/*.tsx`: small presentational sections

## Rules to follow for other routes

1. Keep `page.tsx` thin (render one view component).
2. Place route-specific types and mock/API files under that route folder.
3. Split large UI into named section components.
4. Reuse shared layout/components from `components/dashboard/*`.
5. Avoid mixing route-specific data into shared `components/dashboard/data.ts`.
