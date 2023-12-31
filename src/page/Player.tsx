import { MessageCircle } from 'lucide-react'
import { Video } from '../components/Video.tsx'
import { Header } from '../components/Header.tsx'
import { Module } from '../components/Module.tsx'

import { useEffect } from 'react'
import { useStore } from '../zustand-store/index.ts'

export function Player() {
  const { course, load, currentLesson } = useStore((store) => {
    return {
      course: store.course,
      load: store.load,
      currentLesson:
        store.course?.modules[store.currentModuleIndex].lessons[
          store.currentLessonIndex
        ],
    }
  })

  useEffect(() => {
    document.title = `🔥 Assistindo: ${currentLesson?.title}`
  }, [currentLesson])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />
          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>
        <main className="flex relative overflow-hidden rounded-lg border border-zinc-800 shadow bg-zinc-900 pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="w-80 absolute top-0 bottom-0 right-0 divide-y-2 divide-zinc-900 border-l border-zinc-800 bg-zinc-900 overflow-y-auto scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {course?.modules?.map((module, index) => {
              return (
                <Module
                  key={module.id}
                  moduleIndex={index}
                  title={module.title}
                  amountOfLessons={module.lessons.length}
                />
              )
            })}
          </aside>
        </main>
      </div>
    </div>
  )
}
