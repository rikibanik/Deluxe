type RepoTreePageProps = {
  params: Promise<{ owner: string; repo: string }>;
};

export default async function RepoTreePage({ params }: RepoTreePageProps) {
  const { owner, repo } = await params;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>
        {owner}/{repo} — files
      </h1>
      {/* TODO: FileTree component */}
    </main>
  );
}
