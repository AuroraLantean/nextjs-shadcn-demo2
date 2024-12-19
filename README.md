# Demo2-NextJs15-React19-Shadcn

## Warning
Unpin or uninstall Xverse crypto wallet extension in the Chrome Browser, or you may get this error:
```
TypeError: Cannot redefine property: StacksProvider... chrome-extension://idnnbdplmphpflfnlkomgpfbpcgelopg/inpage.js (27:40749)
```

## Getting Started

Use Biome to replace ESLint
https://biomejs.dev/guides/getting-started/

add Biome VSCode extension
```
pnpm add --save-dev --save-exact @biomejs/biome
pnpm biome init
```

To format and lint: `bun fmtlint`

Add Shadcn UI: 
https://ui.shadcn.com/docs/installation/next
yes for CSS variables
```
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add separator badge 
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add sidebar-07
pnpm add next-themes
```

Add Prisma
https://www.prisma.io/docs/getting-started/quickstart-sqlite
```
pnpm add prisma
```

Use QucikStart: `pnpm dlx prisma init --datasource-provider sqlite`
OR setup a local postgres database and run `pnpm dlx prisma init`
- makes a new directory called prisma that contains a file called schema.prisma, which contains the Prisma schema with your database connection variable and schema models
- makes the .env file in the root directory of the project, which is used for defining environment variables (such as your database connection)

Add the snippet model in `prisma/schema.prisma`, then run `pnpm dlx prisma migrate dev`
then type the migration name = `add snippets`

## Monaco Editor for React 
https://github.com/suren-atoyan/monaco-react
pnpm add @monaco-editor/react
pnpm add @monaco-editor/react --legacy-peer-deps

Run in development mode:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run in production mode:
```bash
bun run build
bun run start
```