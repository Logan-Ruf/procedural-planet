"use strict";

window.SS = window.SS || {};
SS.spheremap = SS.spheremap || {};

// SS.spheremap.Sphere = function(radius, materialArray) {
SS.spheremap.Sphere = function(radius) {
    THREE.Object3D.call(this);

    radius = radius || 1;

    var geometry = new THREE.BoxGeometry(1, 1, 1, 64, 64, 64);

    const position = geometry.attributes.position
    const vertex = new THREE.Vector3();

    for ( let i = 0, l = position.count; i < l; i ++ ) {
        vertex.x = position.array[i * 3]
        vertex.y = position.array[i * 3 + 1]
        vertex.z = position.array[i * 3 + 2]
        vertex.normalize().multiplyScalar(radius);
        position.array[i * 3]     = vertex.x
        position.array[i * 3 + 1] = vertex.y
        position.array[i * 3 + 2] = vertex.z
    }

    SS.util.computeGeometry(geometry);

    return geometry

    var computeVertexNormals = function(geometry) {
        for (var f = 0; f < geometry.faces.length; f++) {
            var face = geometry.faces[f];
            face.vertexNormals[0] = geometry.vertices[face.a].clone().normalize();
            face.vertexNormals[1] = geometry.vertices[face.b].clone().normalize();
            face.vertexNormals[2] = geometry.vertices[face.c].clone().normalize();
        }
    }

    computeVertexNormals(geometry); // TODO: Why is this neccessary? (Why does geometry.computeVertexNormals not work correctly?)

    var sphereMaterial = new THREE.MeshFaceMaterial(materialArray);
    var sphere = new THREE.Mesh(geometry, sphereMaterial);

    this.add(sphere);
}
SS.spheremap.Sphere.prototype = Object.create(THREE.Object3D.prototype);
