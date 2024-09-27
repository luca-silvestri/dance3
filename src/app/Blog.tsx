'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Info, Search, User, ChevronLeft, ChevronRight, Menu, Book, Film } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import HeaderImage from "./images/header.webp"
import FooterImage from "./images/footer.webp"
import WelcomeImage from "./images/welcome.webp"
import AboutImage from "./images/about.webp"

const blogPosts = [
  { 
    id: 1, 
    title: "the earth isn't burning, it's laughing!",
    category: "ecology",
    content: "\
      we often hear the earth is dying, but really, she’s just pulling a long and rather dry practical joke on us. while we scramble to adjust the thermostats of a planet we can barely comprehend, gaia sits back, her tectonic plates casually shifting, raising an eyebrow at our carbon offsets.\
      don’t misunderstand. yes, the polar bears are swimming farther, and the coral reefs are trending toward a washed-out version of their former selves. but maybe—just maybe—the planet is giving us one last riddle to solve. or, to be more precise, she's leaning in, smirking, and whispering, “try again, but this time, with humility.”\
      the trick isn’t in saving the earth; it’s in figuring out how not to be the punchline.\
    "
  },
  { 
    id: 2, 
    title: "priscilla, queen of the desert",
    category: "movies",
    content: "\
      at first glance, priscilla, queen of the desert seems like a neon-colored, glitter-drenched road trip across the australian outback, featuring three drag queens with enough charisma to light up even the most desolate of deserts. but, like any good drag performance, beneath the surface lies a story that’s as much about transformation as it is about the spectacle.\
      the journey of mitzi, felicia, and bernadette is more than just an eccentric, fabulous romp through remote towns. it’s a pilgrimage through identity—where wigs and sequins serve as both armor and expression, where performance is at once a shield against a world that doesn’t always understand and a celebration of everything it refuses to accept.\
      the desert, vast and unyielding, plays its role perfectly as a metaphorical void—a blank canvas on which these characters paint their most extravagant selves. it’s here, in the sun-scorched wilderness, that we see not only the vulnerability of these performers but the resilience, the humor, and the humanity beneath their larger-than-life personas. and when a giant, sparkling stiletto shoe atop a bus becomes a symbol of freedom, you realize priscilla isn't just camp—it’s a survival guide wrapped in feathers.\
      the beauty of the film lies in its defiance of categorization. it’s absurd yet deeply sincere, comedic yet heart-wrenching, flamboyant yet grounded in the raw, everyday experience of not quite belonging. the film embraces contradiction in the same way its characters embrace their costumes: unapologetically and with an extra layer of glitter.\
      conclusion: priscilla, queen of the desert is not just a film about drag queens on a road trip. it’s a cinematic celebration of the courage it takes to turn life into art—especially when life doesn’t always know how to applaud.\
    "
  },
  { 
    id: 3, 
    title: "enlightenment in a group chat",
    category: "spirituality",
    content: "\
      the great mystics meditated in caves, away from distraction, from society, from noise. but had they ever tried to reach nirvana in a 5g network zone, they might’ve rethought their strategies. in the age of infinite content, enlightenment has become a collective hallucination—we just call it social media.\
      think of transcendence as a meme that spreads in the digital ether, mutating, remixing itself into the consciousness of a thousand reddit threads. sure, you could spend years learning esoteric practices, breathing deeply, fasting until your third eye opens wide enough to see through time. or, you could scroll through a well-curated instagram feed of spiritual affirmations and arrive at the same destination, faster. one click at a time.\
      after all, who needs a guru when you have wi-fi?\
    "
  },
  { 
    id: 4, 
    title: "who needs democracy when you have algorithms?",
    category: "governance",
    content: "\
      there was a time when governance was about people. elections, debates, representatives—all so quaint. in the age of big data, who has time for messy human decision-making when an algorithm could do it in seconds, with fewer errors and 10x the efficiency?\
      democracy is evolving. forget voter turnout; imagine a future where you simply feed your values into a governance app, and voilà!—your perfect political candidate materializes, shaped precisely by your preferences, biases, and the subtle influence of your online shopping history.\
      it’s a brave new world of governance, where humans are more like suggestions than decision-makers. but don’t worry—the machines are benevolent, mostly. they even know how to calculate the appropriate level of empathy.\
    "
  },
  { 
    id: 5, 
    title: "winnie the pooh",
    category: "books",
    content: "\
      who knew that a story about a bear with a honey addiction and a group of neurotic woodland creatures could be so deeply existential? winnie the pooh is, at first glance, a charming children's book—an innocent romp through the hundred acre wood. but beneath its surface lies a profound commentary on human nature, anxiety, and the absurdity of life itself.\
      pooh, the bumbling yet lovable protagonist, is a master of zen simplicity. his lack of ambition and deep devotion to the pursuit of pleasure (read: honey) makes him an almost postmodern hero. he's the embodiment of a life lived in the moment, unburdened by the existential crises that plague his companions. we should all aspire to be a little more like pooh—a bear who, despite his limited cognitive capacity, has mastered the art of not overthinking things.\
      meanwhile, eeyore is essentially nietzsche on four legs, forever contemplating the void, while rabbit's need for control is a clear parody of society’s obsession with order. and let’s not forget the enigmatic tigger—a bouncing chaos agent who rejects the notion of conformity entirely.\
      conclusion: is winnie the pooh a children’s book or a critique of human existential suffering? yes.\
    "
  },
  { 
    id: 6, 
    title: "the identity multiverse and its friendly fire",
    category: "intersectionality",
    content: "\
      intersectionality is like a vast, cosmic spaghetti of identities, experiences, and histories crisscrossing in unpredictable directions. but in this beautiful chaos, occasionally, someone trips over a strand and spills the whole plate of progressive discourse on the floor.\
      at its core, intersectionality is the acknowledgment that we’re all tangled up in systems of power. it’s about seeing the web of privilege and oppression, but doing so without getting lost in the moral gymnastics. after all, nobody likes a political pretzel.\
      the irony is that in trying to understand the human experience through a thousand different lenses, we sometimes forget to actually see the human experience. but maybe that’s part of the game—navigate the multiverse of identity without getting caught in the friendly fire of well-meaning discourse. or at least try not to lose yourself in the intersectional venn diagram.\
    "
  },
  { 
    id: 7, 
    title: "transcending gender or just hacking it?",
    category: "transfeminism",
    content: "\
      transfeminism is less of a movement and more of a system upgrade. if gender is the original binary code, transfeminism is the hacker’s manifesto, rewriting the script, tossing in a few glitches, and creating something far more interesting than the original patch.\
      it’s about radical inclusion, but also about realizing that the gender binary was a poorly designed user interface from the start. why stick to an outdated operating system when we can upload an entirely new one that better fits the complexities of human experience?\
      the irony, of course, is that in transcending gender, we’re still stuck talking about it. but that’s okay—sometimes, the code needs a few bugs to keep things interesting.\
    "
  },
  { 
    id: 8, 
    title: "the brothers karamazov",
    category: "books",
    content: "\
      dostoevsky's the brothers karamazov is what happens when you give human morality a stiff drink and let it spiral into a five-day philosophical bender. this is not just a novel—it’s a sprawling metaphysical wrestling match between free will, guilt, faith, and nihilism, all wrapped up in the story of a family so dysfunctional, they make reality tv look tame.\
      at the heart of it all is the father, fyodor pavlovich, a hedonistic hot mess who seems more concerned with vodka than virtue. his sons, meanwhile, represent different facets of the human condition. dmitri is passion and chaos incarnate, while ivan is the cold, rational intellectual whose existential crisis could be the plot of a modern-day ted talk on atheism. and then there’s alyosha, the spiritual glue holding it all together, embodying the quiet, impossible hope that maybe—just maybe—there’s something redemptive about humanity after all.\
      the novel’s famous chapter, “the grand inquisitor,” is practically a masterclass in theological debate, delivered by an atheist who can’t quite let go of god. here, dostoevsky reminds us that faith isn’t something you solve like a quadratic equation—it’s an unsolvable puzzle, and that’s kind of the point.\
      conclusion: if you’ve ever wondered what it feels like to experience an intellectual marathon while questioning the meaning of life, the brothers karamazov is your perfect companion. just bring a dictionary and an existential crisis to fully enjoy the ride.\
    "
  },
]

export default function Blog() {
  type BlogPost = { id: number; title: string; category: string; content: string; };
  const [glitchText, setGlitchText] = useState("")
  const [hoverColor, setHoverColor] = useState("text-cyan-400")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [showAbout, setShowAbout] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const postsPerPage = 4

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(Math.random().toString(36).substring(2, 7))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const colors = ["text-cyan-400", "text-pink-400", "text-purple-400", "text-yellow-400"]
    const interval = setInterval(() => {
      setHoverColor(colors[Math.floor(Math.random() * colors.length)])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 font-mono lowercase">
      <header className="p-6 border-b border-cyan-400 sticky top-0 bg-gray-900 z-50">
        <div className="relative z-10 flex justify-between items-center align-bottom">
          <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500">
            dance!³
          </h1>
          <nav className="hidden md:flex items-center space-x-4">
          </nav>
          <div className="relative hidden md:flex space-x-4">
          {/*
            <Button onClick={() => setShowAbout(true)} variant="ghost" className={`text-lg hover:${hoverColor} transition-colors`}>
              <Info size={24} />
            </Button>
          */}
            <Input
              type="text"
              placeholder="search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 text-cyan-400 px-4 py-2 rounded-full pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400" size={20} />
          </div>
          <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </Button>
        </div>
      </header>

      <Image
        src={HeaderImage}
        alt="Cyberpunk cityscape"
        width={1920}
        height={800}
        className="w-full h-full border-b border-cyan-400 object-cover mb-16"
      />

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="md:hidden bg-gray-800 p-4 absolute top-20 left-0 right-0 z-40"
          >
            <nav className="flex flex-col space-y-2">
              <Button onClick={() => { setShowAbout(true); setIsMenuOpen(false); }} variant="ghost" className={`text-lg hover:${hoverColor} transition-colors`}>
                <Info size={24} />
              </Button>
            </nav>
            <Input
              type="text"
              placeholder="search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 text-cyan-400 px-4 py-2 rounded-full pr-10 mt-4"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto p-6">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-32"
        >
          <div className="relative z-10">
            <h2 className="text-7xl font-bold mt-16 mb-16 text-pink-500 text-center">welcome to my digital dreamscape</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative mb-4 mt-12">
                <p className="mb-8 text-3xl">
                  hello, intrepid traveler! welcome to this delightful realm — where ideas swirl and twirl, ponder their own existence, and then tumble into a delightful jumble of contradictions, all with a cheeky wink. here, nothing is quite what it appears, yet everything is just as it should be!
                </p>
                <p className="mb-8 text-3xl">
                  pull up a chair, breathe deep, and stay as long as you like.
                </p>
                <p className="text-3xl">
                  welcome to the echo.
                </p>
              </div>
              <Card className="bg-gradient-to-br from-cyan-500 via-pink-500 to-purple-500 p-1">
                <CardContent className="bg-gray-900 p-4 relative overflow-hidden text-right">
                  <Image
                    src={WelcomeImage}
                    alt="Glitchy circuit board"
                    width={900}
                    height={500}
                    className="opacity-40"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-32 mb-32 relative"
        >
          <div className="relative z-10">
            <h2 className="text-7xl font-bold mt-16 mb-16 text-purple-500 text-center">disclaimer</h2>
              <div className="relative">
                <p className="mb-4 text-4xl text-purple-300">
                  this is an ai-generated wonderland — a whimsical fever dream brought to life by an algorithm with a flair for existential irony! any echoes of genuine profundity are totally accidental and might just be a glitch in the matrix. side effects may include spontaneous bouts of reality questioning, unexpected cravings for silicon-based snacks, and a nagging feeling that your toaster is secretly plotting world domination. explore at your own risk, and remember: in cyberspace, no one can hear you meme!
                </p>
              </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-32 relative"
        >
          <div className="relative z-10">
            <h2 className="text-7xl font-bold mt-16 mb-16 text-pink-500 text-center">about</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-cyan-500 via-pink-500 to-purple-500 p-1">
                <CardContent className="bg-gray-900 p-4 relative overflow-hidden text-right">
                {/*
                  <h3 className="text-4xl font-bold mb-4 text-yellow-400">system status</h3>
                  <p className="mb-2 font-bold text-cyan-400">irony levels: critical</p>
                  <p className="mb-2 font-bold text-cyan-400">existential crisis: imminent</p>
                  <p className="mb-2 font-bold text-cyan-400">reality distortion: optimal</p>
                  <p className="font-bold text-cyan-400">ai sentience: loading...</p>
                */}
                  <Image
                    src={AboutImage}
                    alt="Glitchy circuit board"
                    width={900}
                    height={500}
                    className="opacity-40"
                  />
                </CardContent>
              </Card>
              <div className="relative mt-12">
                <p className="mb-4 text-3xl text-cyan-300">
                  behind the glimmering veil of code, there’s a playful adventurer. this whimsical soul twirls on the brink of paradox, where giggles mingle with deep musings, and irony winks at sincerity. they meander along a winding trail between the towering skyscrapers of logic and the lush jungles of imagination, gathering bits of inspiration like treasures, some jagged, some polished, but all utterly captivating.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <section id="blog" className="mb-12">
          <h2 className="text-7xl font-bold mt-16 mb-16 text-purple-500 text-center">latest neural transmissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPosts.map((post, index) => (
              <motion.article 
                key={post.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-2 border-cyan-400 p-6 hover:bg-cyan-900 transition-colors relative overflow-hidden cursor-pointer rounded-lg shadow-lg"
                onClick={() => setSelectedPost(post)}
              >
                {post.category === "ecology" && <User className="absolute top-4 right-4 text-green-400" size={32} />}
                {post.category === "spirituality" && <User className="absolute top-4 right-4 text-purple-400" size={32} />}
                {post.category === "governance" && <User className="absolute top-4 right-4 text-yellow-400" size={32} />}
                {post.category === "computer science" && <User className="absolute top-4 right-4 text-blue-400" size={32} />}
                {post.category === "transfeminism" && <User className="absolute top-4 right-4 text-pink-400" size={32} />}
                {post.category === "intersectionality" && <User className="absolute top-4 right-4 text-orange-400" size={32} />}
                {post.category === "books" && <Book className="absolute top-4 right-4 text-indigo-400" size={32} />}
                {post.category === "movies" && <Film className="absolute top-4 right-4 text-red-400" size={32} />}
                <h3 className="text-2xl font-bold mb-3 text-pink-400">{post.title}</h3>
                <p className="text-lg text-yellow-300 mb-3">{post.category}</p>
                <p className="text-lg text-cyan-300">click to decode transmission...</p>
              </motion.article>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              className="mr-2 text-lg"
            >
              <ChevronLeft size={24} />
            </Button>
            {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
              <Button
                key={i}
                onClick={() => paginate(i + 1)}
                variant={currentPage === i + 1 ? "default" : "outline"}
                className={`mx-1 text-lg ${currentPage === i + 1 ? 'bg-cyan-500 text-white' : 'text-cyan-400'}`}
              >
                {i + 1}
              </Button>
            ))}
            <Button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
              className="ml-2 text-lg"
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
            >
              <h2 className="text-3xl font-bold mb-4 text-pink-400">{selectedPost.title}</h2>
              <p className="text-xl text-yellow-300 mb-4">{selectedPost.category}</p>
              <p className="text-lg text-cyan-300 mb-6">{selectedPost.content}</p>
              <Button 
                onClick={() => setSelectedPost(null)}
                className="bg-pink-500 text-white hover:bg-pink-600 transition-colors text-lg"
              >
                close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAbout && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
            >
              <h2 className="text-4xl font-bold mb-6 text-purple-500">about</h2>
              <div className="relative">
                <Image
                  src={AboutImage}
                  alt="AI-generated author avatar"
                  width={400}
                  height={400}
                  className="float-center mr-8 mb-8 shadow-lg"
                />
                <p className="mb-4 text-lg text-cyan-300">
                  behind the shimmering curtain of code, there’s a wanderer—someone who enjoys navigating the labyrinth of thought like an explorer in a world of shifting sands. this person dances on the edge of paradox, where laughter meets philosophy, and irony holds hands with sincerity. they walk a path that meanders between towering skyscrapers of reason and the wild forests of imagination, collecting fragments of ideas like stones, sometimes sharp, sometimes smooth, always intriguing.
                </p>
                <p className="mb-4 text-lg text-cyan-300">
                  they’ve always been drawn to the intersections—where one thing becomes another, where boundaries blur and certainties dissolve. in this place, where questions are more important than answers, they find solace in the unknown, joy in the contradictions, and meaning in the dance between chaos and order.
                </p>
                <p className="mb-4 text-lg text-cyan-300">
                  the mind behind this journey prefers to let mysteries unfold at their own pace, knowing that in a world of tangled systems, one must laugh as much as one contemplates. this traveler doesn’t mind that the compass they carry happens to be made of algorithms. after all, a map, whether drawn by hand or by code, still leads somewhere interesting.
                </p>
              <Button 
                onClick={() => setShowAbout(false)}
                className="bg-pink-500 text-white hover:bg-pink-600 transition-colors text-lg"
              >
                close
              </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Image
        src={FooterImage}
        alt="Cyberpunk circuit pattern"
        width={1920}
        height={800}
        className="w-full object-cover"
      />

      <footer className="p-6 border-t border-cyan-400 text-center relative">
        <p className="mb-2 text-lg">2024 dance!³. no rights reserved. none whatsoever.</p>
        <p className="text-m text-pink-300">
          this is an ai-generated wonderland — a whimsical fever dream brought to life by an algorithm with a flair for existential irony! any echoes of genuine profundity are totally accidental and might just be a glitch in the matrix. side effects may include spontaneous bouts of reality questioning, unexpected cravings for silicon-based snacks, and a nagging feeling that your toaster is secretly plotting world domination. explore at your own risk, and remember: in cyberspace, no one can hear you meme!
        </p>
        <p className="mt-4 text-xs">
          <span className="inline-block glitch" style={{color: 'transparent', textShadow: '0 0 5px rgba(0,255,255,0.5)'}}>
            {glitchText}
          </span>
        </p>
      </footer>
    </div>
  )
}
