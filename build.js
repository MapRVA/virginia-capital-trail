import YAML from "yaml";
import { readFile, writeFile } from "node:fs/promises";
import osm2geojson from "osm2geojson-ultra";
import {distance} from "@turf/distance";

const transform = (data) => {
  const clusters = [
    [({properties}) => properties.wikidata == 'Q116302533', 0.5], // lawrence lewis jr park
    [({properties}) => properties.wikidata == 'Q3474376', 0.5], // charles city
    [({properties}) => properties.highway == 'trailhead', 0.5],
    [({properties}) => properties.wikidata == 'Q49495628', 0.25], //Great Shiplock Park
    [({properties}) => properties.leisure == 'park' && properties.name == 'Chickahominy Riverfront Park', 1],
  ]  
  
  const clusterablePoints = data.features.filter(p =>
    p.geometry.type == 'Point' &&
    p.properties.highway != 'milestone');

  const clusterFeatures = [];
  for (const [f, d] of clusters) {
    for (const clusterPoint of data.features.filter(f)) {
      clusterPoint.properties.maxzoom = true;
      clusterPoint.properties.amenities = clusterablePoints
        .filter(p => distance(p.geometry.coordinates, clusterPoint.geometry.coordinates) < d)
        .map(p => {
          p.properties.minzoom = true;
          return p.properties.amenity || p.properties.tourism || p.properties.leisure
        });
      delete clusterPoint.properties.minzoom;
      clusterFeatures.push(clusterPoint);
    }
  }
  const nonClusters = data.features.filter(({properties}) => properties.highway !== 'trailhead' && !properties.place);
  return {type: 'FeatureCollection', features: [...nonClusters, ...clusterFeatures]};
}

const ultraQuery = await readFile("./map.ultra", "utf8")
const [, settingsStr, query] = ultraQuery.split("---");
const settings = YAML.parse(settingsStr, { merge: true });
settings.type = 'geojson';
const resp = await fetch('https://overpass.maprva.org/api/interpreter', {
  method: "POST",
  body: query,
});
const json = await resp.json();
const geoJSON = transform(osm2geojson(json));
await writeFile("data.geojson", JSON.stringify(geoJSON));
await writeFile("prefetched.ultra", `---
${YAML.stringify(settings)}
---
https://raw.githubusercontent.com/MapRVA/virginia-capital-trail/trunk/data.geojson
`);
