var arc = {
    fill: '#333',
    stroke: '#333',
    path: 'M53.286,44.333L69.081,7.904C48.084-1.199,23.615-2.294,0.648,6.78l14.59,36.928C28.008,38.662,41.612,39.27,53.286,44.333z'
};

var paper = Raphael(document.getElementById("notepad"), 500, 500);

var arcDegrees = 45;
var centerX = 210;
var centerY = 210;
var compassRadius = 68;
var currentlyActive = 45;
var directions = [
    {label:'N', degrees:0, rotatedDegrees:270}, 
    {label:'NE', degrees:45, rotatedDegrees:315}, 
    {label:'E', degrees:90, rotatedDegrees:0}, 
    {label:'SE', degrees:135, rotatedDegrees:45}, 
    {label:'S', degrees:180, rotatedDegrees:90}, 
    {label:'SW', degrees:225, rotatedDegrees:135}, 
    {label:'W', degrees:270, rotatedDegrees:180}, 
    {label:'NW', degrees:315, rotatedDegrees:225}
];

function arcClicked()
{
    var label = $(this).data('direction-label');
    $("#activeArc").attr('id', null);
    $(this).attr('id', 'activeArc');
}

for (i = 0; i < 360; i += arcDegrees) {
    var direction = _.find(directions, function(d) { return d.rotatedDegrees == i; });
    var radians = i * (Math.PI / 180);
    var x = centerX + Math.cos(radians) * compassRadius;
    var y = centerY + Math.sin(radians) * compassRadius;
        
    var newArc = paper.path(arc.path);
    // newArc.translate(x, y);
    // newArc.rotate(i + 89);
    newArc.transform('T' + x + ',' + y + 'r' + (i + 89));
    
    if (direction.degrees == currentlyActive) {
        $(newArc.node).attr('id', 'activeArc');
    }
        
    $(newArc.node)
        .attr('class', 'arc')
        .data('direction-label', direction.label)
        .on('click', arcClicked);
}
