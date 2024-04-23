# 🛒 GrocerySync
**GrocerySync** is a web application designed to streamline the process of creating, managing, and sharing grocery lists among household members or groups. It simplifies the task of planning and shopping for groceries by allowing users to collaboratively create and update shared lists, ensuring that everyone is on the same page when it comes to shopping needs.

🟧 [Lucidchart (class diagrams, flowcharts, etc.)](https://lucid.app/lucidchart/0f3056a8-f56b-4b07-8016-12f02183e3c2/edit?viewport_loc=70%2C-1004%2C2260%2C1128%2C0_0)

### Key features
- Registration & Auth (including 3rd party - e.g. Facebook, Gmail)
- Manage & Share Lists (create multiple grocery lists, share them with household members, etc.)
- Real-time collaboration (multiple users can view and edit at the same time)
- Push notifications (notify users when changes are made to shared lists)
- History and archive (keep the history of past grocery lists and purchases)

### Tech stack
- Development approach: `TDD`
- Package manager: `pnpm`
- UI: `TypeScript`, `Next.js`, `Tailwind`, `Storybook`, `Socket.io`
- Server: `Node`, `Nest.js`,
- Database: `Amazon DynamoDB`
- Testing: `Jest`, `Playwright`
- CI/CD: `GitHub Actions`
- IaC: `Terraform`
- Deployment: `Kubernetes`, `Amazon EC2`
