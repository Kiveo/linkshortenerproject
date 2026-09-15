# Frontend standards

- All UI elements in this app must use shadcn/ui components from `components/ui`.
- Do not create custom UI components, custom wrappers, or any other bespoke UI implementation for app screens or interactions.
- Do not create custom component files for interface elements. Use shadcn/ui primitives exclusively for buttons, inputs, dialogs, cards, badges, forms, navigation, and similar UI patterns.
- Keep styling consistent with Tailwind utilities and the shadcn design system. Do not introduce bespoke CSS, custom styling patterns, or non-shadcn component abstractions.
- Accessibility, behavior, and interaction patterns must come from the shadcn/ui components themselves; no custom UI logic or custom component implementations are allowed.
- This is a strict requirement: the app must use shadcn/ui for all UI components, with no custom UI components or custom UI code.
