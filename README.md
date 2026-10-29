# Virginia Capital Trail Map

This repo the process for building a map from [OpenStreetMap](https://openstreetmap.org) data using
[Ultra](https://gitlab.com/trailstash/ultra) for the
[Virginia Capital Trail Foundation](https://www.virginiacapitaltrail.org/).

### Preview
Preview the map here: https://maprva.github.io/virginia-capital-trail/

### Use the map!

#### Embed
You can embed the preview page directly onto your site too:
```
<iframe src="https://maprva.github.io/virginia-capital-trail/"/>
```

#### MapLibre
To use the map with [MapLibre](https://maplibre.org) use this as your style URL:
```
https://maprva.github.io/virginia-capital-trail/style.json
```

### Development
It uses the experimental `ultra run` CLI to build a `style.json` and uses
[Pinhead-JS](https://gitlab.com/trailstash/pinhead-js) and
[sprite-one](https://github.com/unvt/sprite-one) to build the sprites.

It uses Ultra's [`transform:`](https://overpass-ultra.us/docs/yaml/#transform) and
[TurfJS's `distance` function](https://turfjs.org/docs/api/distance) to create clusters
for specific point with many amenities:
* Great Shiplock Park
* Four Mile Creek Trailhead
* Herring Creek Trailhead
* Lawrence Lewis Jr Park
* Charles City
* Chickahominy Riverfront Park
