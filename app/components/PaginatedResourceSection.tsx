import * as React from 'react';

export function PaginatedResourceSection<NodesType>({
  connection,
  children,
  resourcesClassName,
}: {
  connection: {nodes: NodesType[]};
  children: React.FunctionComponent<{node: NodesType; index: number}>;
  resourcesClassName?: string;
}) {
  const nodes = connection?.nodes || [];
  const resourcesMarkup = nodes.map((node, index) => children({node, index}));

  return (
    <div>
      {resourcesClassName ? (
        <div className={resourcesClassName}>{resourcesMarkup}</div>
      ) : (
        resourcesMarkup
      )}
    </div>
  );
}
