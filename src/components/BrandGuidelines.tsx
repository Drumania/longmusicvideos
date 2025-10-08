
export function BrandGuidelines() {
  return (
    <div className="p-8 bg-card text-card-foreground rounded-lg font-sans">
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-2">Typography & Colors</h1>
      </header>

      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Font</h2>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-2xl">Plus Jakarta Sans</span>
          <div className="flex gap-4 text-muted-foreground">
            <span>ExtraBold</span>
            <span>Semibold</span>
            <span>Medium</span>
            <span>Regular</span>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Heading 2 40px</p>
            <h2 className="text-4xl font-bold">Your innovative travel companion.</h2>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Subheading 2 30px</p>
            <h3 className="text-3xl font-semibold">Your innovative travel companion.</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Body 2 20px</p>
            <p className="text-xl">Your innovative travel companion.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
