"use client";

import React, { useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  BackgroundVariant,
  type XYPosition,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { computerScienceProgram, type Course } from '@/lib/mock-data';
import CustomNode from './custom-node';

const nodeTypes = {
  custom: CustomNode,
};

const NODE_WIDTH = 256;
const NODE_HEIGHT = 80;
const HORIZONTAL_SPACING = 50;
const VERTICAL_SPACING = 100;
const PADDING = 100;

interface CourseDiagramProps {
  onNodeClick: (course: Course) => void;
}

export function CourseDiagram({ onNodeClick }: CourseDiagramProps) {
  const { nodes, edges, translateExtent } = useMemo(() => {
    const initialNodes: Node<Course>[] = [];
    const initialEdges: Edge[] = [];
    const coursesBySemester: Record<number, Course[]> = {};

    computerScienceProgram.courses.forEach(course => {
      if (!coursesBySemester[course.semester]) {
        coursesBySemester[course.semester] = [];
      }
      coursesBySemester[course.semester].push(course);
    });

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    Object.entries(coursesBySemester).forEach(([semesterStr, courses]) => {
      const semester = parseInt(semesterStr, 10);
      const xOffset = (courses.length - 1) * (NODE_WIDTH + HORIZONTAL_SPACING) / 2;

      courses.forEach((course, index) => {
        const position: XYPosition = {
          x: index * (NODE_WIDTH + HORIZONTAL_SPACING) - xOffset,
          y: (semester - 1) * (NODE_HEIGHT + VERTICAL_SPACING),
        };
        
        minX = Math.min(minX, position.x);
        maxX = Math.max(maxX, position.x + NODE_WIDTH);
        minY = Math.min(minY, position.y);
        maxY = Math.max(maxY, position.y + NODE_HEIGHT);

        initialNodes.push({
          id: course.id,
          type: 'custom',
          position,
          data: course,
        });

        course.prerequisites.forEach(prereqId => {
          initialEdges.push({
            id: `e-${prereqId}-${course.id}`,
            source: prereqId,
            target: course.id,
            type: 'smoothstep',
            animated: false,
            style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
            markerEnd: { type: 'arrowclosed', color: 'hsl(var(--primary))' },
          });
        });
      });
    });

    const extent: [[number, number], [number, number]] = [
      [minX - PADDING, minY - PADDING],
      [maxX + PADDING, maxY + PADDING]
    ];

    return { nodes: initialNodes, edges: initialEdges, translateExtent: extent };
  }, []);

  const handleNodeClick = (_: React.MouseEvent, node: Node<Course>) => {
    onNodeClick(node.data);
  };

  return (
    <div className="h-full w-full bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        zoomOnScroll
        panOnDrag
        panOnScroll={false}
        zoomOnDoubleClick={false}
        className="react-flow-course-diagram"
        proOptions={{ hideAttribution: true }}
        translateExtent={translateExtent}
      >
        <Controls />
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} />
      </ReactFlow>
    </div>
  );
}
