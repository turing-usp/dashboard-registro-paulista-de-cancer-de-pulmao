import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function BarChartSex({data, key, sex}){
    return(
            <ResponsiveContainer width={'99%'} height={300}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    isAnimationActive={true}
                    animationDuration={1}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={key} tick={false}/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {sex == "feminino" || sex == "ambos"?<Bar dataKey="Feminino" stackId="a" fill="#8884d8" />:""}
                    {sex == "masculino" || sex == "ambos"?<Bar dataKey="Masculino" stackId="a" fill="#82ca9d" />:""}
                </BarChart>
            </ResponsiveContainer>
    )
}