import * as vl from 'vega-lite-api'
import { RedcapRecord } from '../controllers/getData'
import { group } from 'd3'


export const generateBars = (data: RedcapRecord[], field: string, title: string, color: string, filters: any[]) => {
    let intViewportWidth = window.innerWidth;
    return vl.
    data(data)
    .title(title)
    .transform(
        ...filters,
        ...relativeFrequency(field, 'Porcentagem')
    ).encode(
        vl.color().value(color),
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
    ).width(intViewportWidth*0.6)}

export const generateDonnuts = (data: RedcapRecord[], field: string, title: string, filters: any[]) => {
    let intViewportWidth = window.innerWidth;
    const chart =  vl.
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
            vl.markArc({ innerRadius: 0, outerRadius: intViewportWidth/15 }),
            vl.markText({ radius: intViewportWidth/13 })
                .encode(
                    vl.text().fieldN(field)
                ),
            vl.markText({ radius: intViewportWidth/25, fill: 'white' })
                .encode(
                    vl.text().fieldQ('Porcentagem').format('.1%').if({ field: "Porcentagem", lt: 0.04 })
                ),
        ).autosize({type: 'fit', contains: 'padding'})

    return chart 
}

export const uniques = (key: string, data: any[]) => [...group(data, d => d[key]).keys()].sort()

export const relativeFrequency = (groupby: string, name = 'Porcentagem') => [
    vl.aggregate({ "op": "count", "as": "Count" }).groupby(groupby),
    vl.joinaggregate({ "op": "sum", "field": "Count", "as": "Total" }),
    vl.calculate("datum.Count/datum.Total").as(name)
]