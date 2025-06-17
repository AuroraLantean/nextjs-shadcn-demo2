# Demo2-NextJs15-React19-Shadcn

TODO: Next.js Top 7 Security Best Practices (Checklist)
https://www.youtube.com/watch?v=yDjXW-0Gi6k
TODO: https://gist.github.com/ECBSJ/0cd822062a998ada1393a830a48c1043
https://www.youtube.com/watch?v=5sh6Gt3ojuw&t=365s
TODO: etching mint bitcoin runes javascript
https://docs.hiro.so/stacks/connect/guides/authenticate-users
https://github.com/hirosystems/connect?tab=readme-ov-file

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

Add ReactCompiler:
https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler
```
pnpm install babel-plugin-react-compiler
```

Add Shadcn UI: 
https://ui.shadcn.com/docs/installation/next
yes for CSS variables
```
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add separator badge 
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add sidebar
pnpm add next-themes
```
Add relevant CSS code into global.css(into the @layer base section)

## VSCode Plugin - Console Ninja
Console Ninja VSCode Extension 
https://www.youtube.com/watch?v=OC-_fcJyz_c

## State Management - Jotai, Atomic State Style
Why: Jotai is infinitely simpler than Redux, less restricting & less rerendering than React Context, less boilerplates than Zustand, as easy as using React useState hook! No big config file.

## Mystern Dapp Kit
https://sdk.mystenlabs.com/dapp-kit

## Database ORM
### Add Drizzle

### Add Prisma
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

## Add Hiro Runes API
https://docs.hiro.so/bitcoin/runes/api

## Add Stacks Connect Authenticate
https://docs.hiro.so/stacks/connect/guides/authenticate-users

Stacks.js Starters
https://github.com/hirosystems/stacks.js-starters

Run in development mode:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run in production mode:
```bash
bun build
bun start
```