import { motion } from 'framer-motion'
export const FadeIn = (props: any) => <motion.div initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} viewport={{ once: true }} transition={{duration:.5}} {...props} />
