import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import SeriesList from './series-list';

/**
 * Builds the query that retrieves the series on a given family.
 */
const queryBuilder = family => `
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?series ?label
  FROM <http://rdf.insee.fr/graphes/operations>
  WHERE {
    <${family}> dcterms:hasPart ?series .
    ?series skos:prefLabel ?label .
  }
  ORDER BY ?series
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'seriesByFamily',
  params: ['family']
})

function SeriesByFamily({ seriesByFamily }) {
  if (seriesByFamily.length === 0) {
    return <span>Cette famille ne contient aucune série</span>
  }
  return <SeriesList series={seriesByFamily} />
}

export default connector(SeriesByFamily, {
  loading: () => <span>Chargement de la liste des séries</span>
})
