[out:json];
relation[wikidata=Q7934165] -> .route;
.route out geom;
(
  nwr[amenity=drinking_water](around.route:100);
  nwr[shop=bicycle](around.route:100);
  nwr[tourism=camp_site][backcountry!=yes](around.route:2000);
  nwr[tourism=guest_house](around.route:5000);
  nwr[tourism=hotel](around.route:1000);
  nwr[amenity=toilets](around.route:100);
  nwr[amenity=parking][access=yes](around.route:100);
  nwr[amenity=bicycle_repair_station](around.route:50);
  nwr[amenity=restaurant](around.route:100);
  nwr[shop=convenience](around.route:100);
  node[highway=trailhead](around.route:100);
);
out center;
node[highway=milestone][ref='Virginia Capital Trail'];
out;
