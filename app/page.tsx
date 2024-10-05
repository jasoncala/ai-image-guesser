'use client';
import { cn } from "@/lib/utils";
import GridPattern from "../components/ui/grid-pattern";
import EnterName from '@/components/EnterName';
import NavDock from '@/components/NavDock';

export type IconProps = React.HTMLAttributes<SVGElement>;

export default function Home() {

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <GridPattern
        squares={[
          // Smiley
          [28, 7],
          [28, 6],
          [31, 7],
          [31, 6],
          [26, 9],
          [26, 10],
          [27, 11],
          [28, 11],
          [29, 11],
          [30, 11],
          [31, 11],
          [32, 11],
          [33, 10],
          [33, 9],
          // J.C. message
          [2, 21],
          [3, 21],
          [4, 21],
          [3, 22],
          [3, 23],
          [3, 24],
          [2, 24],
          [5, 24],
          [9, 24],
          [8, 24],
          [7, 24],
          [7, 23],
          [7, 22],
          [7, 21],
          [8, 21],
          [9, 21],
          [11, 24],

        ]}
        className={cn( 
          "[mask-image:radial-gradient(500px_circle_at_center,transparent,white)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 bg-white",
        )}
      />
      <NavDock />
      <EnterName />
    </div>
  );
}
