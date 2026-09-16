# Server Actions

Server Actions are public endpoints. Always verify auth.

Server Actions should not throw errors. Return an object with either an `error` property or a `success` property so the calling component can handle the result explicitly.

## Basic Protection

```typescript
'use server';
import { auth } from '@clerk/nextjs/server';

export async function createPost(formData: FormData) {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) return { error: 'Unauthorized' };

  const title = formData.get('title') as string;
  await db.posts.create({ data: { title, authorId: userId } });
  revalidatePath('/posts');
  return { success: true };
}
```

## Org + Role Check (B2B)

```typescript
'use server';
import { auth } from '@clerk/nextjs/server';

export async function createTeamProject(formData: FormData) {
  const { userId, orgId, orgRole } = await auth();
  if (!userId || !orgId) return { error: 'Must be in an organization' };
  if (orgRole !== 'org:admin') return { error: 'Only admins can create projects' };

  const name = formData.get('name') as string;
  await db.projects.create({ data: { name, organizationId: orgId } });
  return { success: true };
}
```

## Permission Check (RBAC)

```typescript
'use server';
import { auth } from '@clerk/nextjs/server';

export async function deleteProject(projectId: string) {
  const { userId, has } = await auth();
  if (!userId) return { error: 'Unauthorized' };

  const canDelete = await has({ permission: 'org:project:delete' });
  if (!canDelete) return { error: 'Missing permission' };

  await db.projects.delete({ where: { id: projectId } });
  return { success: true };
}
```

> **Core 2 ONLY (skip if current SDK):** `isAuthenticated` is not available. Use `if (!userId)` instead.

[Docs](https://clerk.com/docs/reference/nextjs/server-actions)
