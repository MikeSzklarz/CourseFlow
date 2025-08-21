import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, BookOpen, Star, ChevronsRight } from 'lucide-react';
import type { Course } from '@/lib/mock-data';

interface CourseDetailSidebarProps {
  course: Course | null;
  allCourses: Course[];
  onClose: () => void;
}

export function CourseDetailSidebar({ course, allCourses, onClose }: CourseDetailSidebarProps) {
  if (!course) {
    return (
      <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center bg-card rounded-lg">
        <div className="flex flex-col items-center gap-4 p-8 border-2 border-dashed rounded-xl">
          <BookOpen className="h-16 w-16 text-muted-foreground" />
          <h3 className="text-xl font-semibold text-foreground font-headline">Select a Course</h3>
          <p className="text-muted-foreground max-w-xs">Click on any course in the diagram to see its details here.</p>
        </div>
      </div>
    );
  }

  const prerequisites = course.prerequisites.map(prereqId => {
    return allCourses.find(c => c.id === prereqId);
  }).filter(Boolean) as Course[];

  return (
    <div className="flex flex-col h-full bg-card">
       <CardHeader className="relative p-6 border-b">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 md:hidden"
          onClick={onClose}
          aria-label="Close course details"
        >
          <X className="h-4 w-4" />
        </Button>
        <CardTitle className="text-2xl font-bold text-primary pr-10 font-headline">{course.title}</CardTitle>
        <CardDescription>{course.code}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-4 overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg mb-2 font-headline">Description</h4>
            <p className="text-muted-foreground leading-relaxed">{course.description}</p>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
            <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="font-semibold text-secondary-foreground">Credits</span>
            </div>
            <Badge variant="outline" className="text-lg bg-background">{course.credits}</Badge>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2 font-headline">Prerequisites</h4>
            {prerequisites.length > 0 ? (
              <ul className="space-y-2">
                {prerequisites.map(prereq => (
                  <li key={prereq.id} className="flex items-center gap-3 p-3 rounded-md border bg-muted/50">
                    <ChevronsRight className="h-4 w-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">{prereq.code}</p>
                      <p className="text-sm text-muted-foreground">{prereq.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground italic p-3 rounded-md bg-muted/50 text-center">No prerequisites for this course.</p>
            )}
          </div>
        </div>
      </CardContent>
    </div>
  );
}
