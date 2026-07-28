# Court Click - Certified True Copy (CTC) Orders

A frontend implementation of the Court Click admin dashboard's CTC Orders screen, built as part of a frontend machine test.

**Live Demo:** https://frontend-machine-test-pi.vercel.app/

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Ant Design (antd)** for UI components
- **@ant-design/nextjs-registry** for SSR-compatible Ant Design styling

## Features Implemented

- Orders table matching the Figma design (User Info, Court Complex, Products, Order Date, Status, Tags/Notes, Clerk, Actions)
- Responsive layout — sidebar hides on screens under 600px, table scrolls horizontally on smaller screens
- **Filter Users modal** — District, Court Establishment, Product filters with required-field validation
- **Choose Tag modal** — select/remove tags per order, with edit/delete actions
- **Create New Tag modal** — name + color picker, with required-field validation
- **Order Details modal** — shows full case details (applicant, case number, CNR number, etc.) per order, opened via the "View" button
- Status badges with color coding (cancelled, order placed, payment completed)
- Reusable component architecture (see Folder Structure below)

## Folder Structure

```
src/
  app/
    layout.tsx       # Root layout — wires in AntdRegistry and Sidebar
    page.tsx         # Main Orders page
    globals.css       # Global styles + responsive sidebar rule
  components/
    Sidebar.tsx           # Left navigation sidebar (hides on mobile)
    OrderStatusTag.tsx     # Reusable status badge
    TagList.tsx             # Renders tag chips for a row
    FilterUsersModal.tsx   # Filter Users modal + form
    TagModals.tsx           # Choose Tag + Create New Tag modals
    OrderDetailsModal.tsx  # Order Details modal
  data/
    mockOrders.ts     # Mock order data (sample dataset for the table)
  types/
    order.ts          # OrderRecord and OrderDetails TypeScript interfaces
```

## Getting Started Locally

1. Clone the repository:
   ```
   git clone https://github.com/Malavikasureshk/frontend-machine-test.git
   cd frontend-machine-test
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Notes

- Table data is mocked (`src/data/mockOrders.ts`) with 3 sample rows; pagination total (4810) reflects the number shown in the original design for visual accuracy, though only the first few pages have real backing data.
- Form validation is implemented using Ant Design's `Form` component with required-field rules (see Filter Users and Create New Tag modals).
