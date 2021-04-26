"use strict";

window.SS = window.SS || {};
SS.warp = SS.warp || {};

SS.warp.geometry_warp = function (geometry){

    const position = geometry.attributes.position
    const vertex = new THREE.Vector3();
    const warp_vertex = new THREE.Vector3(1,2, .5)


    for ( let i = 0, l = position.count; i < l; i ++ ) {
        vertex.x = position.array[i * 3]
        vertex.y = position.array[i * 3 + 1]
        vertex.z = position.array[i * 3 + 2]
        vertex.multiply(warp_vertex)
        position.array[i * 3]     = vertex.x
        position.array[i * 3 + 1] = vertex.y
        position.array[i * 3 + 2] = vertex.z
    }

    SS.util.computeGeometry(geometry);

    return geometry
}