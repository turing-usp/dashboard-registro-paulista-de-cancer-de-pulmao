import * as vl from 'vega-lite-api'
import { RedcapRecord } from '../data-source/redcap'
import { group } from 'd3'

export const generateBars = (data: RedcapRecord[], field: string, title: string, filters: any[]) => vl.
    data(data)
    .title(title)
    .transform(
        ...filters,
        ...relativeFrequency(field, 'Porcentagem')
    ).encode(
        // vl.color().value('#3db0fa'),
        vl.y()
            .fieldO(field)
            .scale({ domain: uniques(field, data) })
            .axis({ labelExpr: 'split(datum.label, "-")[0]' }),
        vl.tooltip().fieldN(field),
        vl.x()
            .fieldQ('Porcentagem')
            .scale({ domain: [0, 1] })
            .axis({ title: null, format: '.1%' })
    ).layer(
        vl.markBar(),
        vl.markText({ align: "left", dx: 5, dy: 1 })
            .encode(
                vl.text().fieldN('Porcentagem').format(".2%")
            )
    ).width(800)

export const generateDonnuts = (data: RedcapRecord[], field: string, title: string, filters: any[]) => {
    return vl.
        data(data)
        .title(title)
        .transform(
            ...filters,
            ...relativeFrequency(field, 'Porcentagem'),
        ).encode(
            vl.color().fieldN(field).legend(null),
            vl.theta()
                .fieldQ('Porcentagem').stack(true),
            // vl.tooltip([vl.fieldQ('Porcentagem'), vl.fieldN(field)]),
            vl.tooltip().fieldQ('Porcentagem').format('.2%'),
        )
        .layer(
            vl.markArc({ innerRadius: 40, outerRadius: 120 }),
            vl.markText({ radius: 140 })
                .encode(
                    vl.text().fieldN(field)
                ),
            vl.markText({ radius: 80, fill: 'white' })
                .encode(
                    vl.text().fieldQ('Porcentagem').format('.1%').if({ field: "Porcentagem", lt: 0.04 })
                ),
        )
}

export const uniques = (key: string, data: any[]) => [...group(data, d => d[key]).keys()].sort()

export const relativeFrequency = (groupby: string, name = 'Porcentagem') => [
    vl.aggregate({ "op": "count", "as": "Count" }).groupby(groupby),
    vl.joinaggregate({ "op": "sum", "field": "Count", "as": "Total" }),
    vl.calculate("datum.Count/datum.Total").as(name)
]