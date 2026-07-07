import { Seo } from '../components/Seo';
import { PageHeader, Section } from '../components/DocPrimitives';
import { ComponentPreview } from '../components/ComponentPreview';
import { PropsTable } from '../components/PropsTable';
import { DoDont } from '../components/DoDont';
import { MapSurface } from '../../../components/ui/MapSurface';
import { Alert } from '../../../components/ui/Alert';
import { BASE } from '../nav';

export default function MapsPage() {
  return (
    <>
      <Seo title="GIS / Maps" description="Map surface, markers and legend conventions for Alio GIS products." path={`${BASE}/components/maps`} />
      <PageHeader
        eyebrow="Components"
        title="GIS / Maps"
        description="GIS is core to Alio's work. MapSurface provides the branded chrome — dark navy canvas, subtle grid, node-dot markers and a legend — ready to sit over a real Leaflet or MapLibre tile layer."
      />

      <Alert variant="info" title="Production integration" className="mb-8">
        MapSurface is the visual shell. In production, render your tile layer
        (Leaflet / MapLibre GL) inside it and keep markers on the categorical
        chart palette; use the sequential palette (#D0F6FC → #2B3990) for choropleths.
      </Alert>

      <Section title="Map with markers & legend">
        <ComponentPreview padded={false} align="start">
          <div className="w-full p-6">
            <MapSurface
              markers={[
                { x: 30, y: 40, label: 'Kilamba', colorIndex: 1 },
                { x: 52, y: 55, label: 'Talatona', colorIndex: 2 },
                { x: 68, y: 35, label: 'Viana', colorIndex: 3 },
                { x: 45, y: 70, label: 'Camama', colorIndex: 0 },
                { x: 60, y: 20, label: 'Cacuaco', colorIndex: 4 },
              ]}
              legend={[
                { color: 'var(--chart-2)', label: 'Active sites' },
                { color: 'var(--chart-3)', label: 'Surveyed' },
                { color: 'var(--chart-4)', label: 'Planned' },
              ]}
            />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'markers', type: 'MapMarker[]', description: '{ x, y (0–100%), label?, colorIndex? }' },
            { name: 'legend', type: 'MapLegendItem[]', description: '{ color, label } — rendered bottom-left.' },
            { name: 'height', type: 'number', default: '320', description: 'Canvas height in px.' },
            { name: 'children', type: 'ReactNode', description: 'Overlay your tile layer or controls here.' },
          ]}
        />
      </Section>

      <Section title="Guidelines">
        <DoDont
          dos={[
            { text: 'Keep markers on the categorical chart palette, in order.' },
            { text: 'Use the sequential palette for density / choropleth layers.' },
            { text: 'Always pair colour-coded markers with a legend.' },
          ]}
          donts={[
            { text: 'Rely on colour alone — add labels or shapes for accessibility.' },
            { text: 'Use blue-glow “tech” overlays or circuit-board imagery.' },
            { text: 'Overload the canvas with more than ~8 marker categories.' },
          ]}
        />
      </Section>
    </>
  );
}
