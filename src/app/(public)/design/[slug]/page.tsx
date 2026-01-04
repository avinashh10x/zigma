interface DesignPageProps {
  params: {
    slug: string;
  };
}

export default function DesignPage({ params }: DesignPageProps) {
  return (
    <div>
      <h1>Design Detail: {params.slug}</h1>
      <p>Copy functionality will be implemented here</p>
    </div>
  );
}
