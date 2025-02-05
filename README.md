# Next.js + Neon Database + Drizzle
postgresql://<username>:<password>@<database>/todo?sslmode=require



## Getting Started
1. Clone this repository
2. Install dependencies
```bash
  pnpm install
```
3. Start the development server
```bash
  pnpm dev
```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## MIGRATIONS 

#### Generate Migration folder
```bash
  pnpm db:generate
```

#### Drizzle Migrate
```bash
  pnpm db:migrate
```

#### Run Local Drizzle Studio
```bash
  pnpm db:studio
```





