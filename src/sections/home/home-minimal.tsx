'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

// ✅ Background & Fallback image from public folder
const backgroundImage = '/assets/background/BG4SVG.svg';
const fallbackImg = '/assets/icons/graphic-contract.png';

export function HomeMinimal() {
  const [products, setProducts] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();

  // ✅ Fetch data from your backend endpoint
  useEffect(() => {
    // Call your backend endpoint
    fetch('/api/fpii/homepageRoutes')
      .then((res) => res.json())
      .then((result) => {
        console.log('Fetched Data:', result); // ✅ See full response in browser console
        setProducts(result.homePageContent[0].fipthObject.titles);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowMore(!showMore);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <Box
      component="section"
      sx={{
        // mt: { xs: -23, sm: -25, md: -35, lg: -35 },
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'hidden',
        position: 'relative',
        py: { xs: 2, md: 2 },
        px: { xs: 3, md: 6 },
      }}
    >
      {/* Section Title */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
          mb: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 400,
            color: '#0057E1',
            background: '#fff',
            zIndex: 1,
            px: 2,
            fontFamily: 'IBM Plex Sans',
            fontSize: '1.5rem',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          Our Products
        </Typography>
        <Box sx={{ flexGrow: 1, height: '1.2px', backgroundColor: '#0057E1' }} />
      </Box>

      <Typography
        sx={{
          mb: 3,
          textAlign: 'left',
          fontSize: '1.3rem',
          color: '#fff',
          bgcolor: '#0057E1',
          width: 'fit-content',
          px: 3,
          py: 1,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          fontFamily: 'IBM Plex Sans',
          fontWeight: 400,
        }}
      >
        Reliable ERP, AI, and mobile solutions drive business growth in today’s digital world.
      </Typography>

      {/* Products Grid */}
      <Box
        sx={{
          height: isAnimating ? (showMore ? 'auto' : '0px') : 'auto',
          overflow: isAnimating ? 'hidden' : 'visible',
          transition: 'height 0.3s ease',
        }}
      >
        <Grid container spacing={4}>
          {products.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id || index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: '1.5rem',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'primary.blue',
                    width: '100%',
                    height: '180px',
                    borderRadius: '20px 20px 200px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    mb: '1rem',
                    pl: '1rem',
                  }}
                >
                  <Image
                    src={item?.image?.url || fallbackImg}
                    alt={item?.head || 'Product image'}
                    width={120}
                    height={100}
                    style={{ objectFit: 'contain', marginLeft: '1rem' }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: '400',
                    textAlign: 'center',
                    mb: '1rem',
                    fontFamily: 'IBM Plex Sans',
                    color: '#0057E1',
                  }}
                >
                  {item.head}
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.65)',
                    fontSize: '1.1rem',
                    fontWeight: '300',
                    textAlign: 'center',
                    mx: '1rem',
                    fontFamily: 'IBM Plex Sans',
                    mb: 2,
                  }}
                >
                  {item.subhead?.slice(0, 150)}...
                </Typography>
                <Button
                  sx={{
                    backgroundColor: '#0057E1',
                    borderRadius: 3,
                    color: '#fff',
                    px: 2,
                    fontSize: '16px',
                    fontFamily: 'IBM Plex Sans',
                    fontWeight: '400',
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    border: '2px solid #0057E1',
                    ':hover': {
                      backgroundColor: '#fff',
                      color: '#0045C2',
                    },
                  }}
                  onClick={() => router.push(`/4pillars/product-more?id=${item._id}`)}
                >
                  Read More
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* See More Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          onClick={() => setVisibleCount((prev) => (prev >= products.length ? 4 : prev + 4))}
          variant="outlined"
          sx={{
            borderRadius: '20px',
            border: '2px solid #0057E1',
            color: '#0057E1',
            px: 3,
            py: 1,
            fontSize: '1.2rem',
            fontFamily: 'IBM Plex Sans',
            '&:hover': { backgroundColor: '#0057E1', color: '#fff' },
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>{visibleCount >= products.length ? '↑' : '↓'}</span>{' '}
          {visibleCount >= products.length ? 'See Less' : 'See More'}
        </Button>
      </Box>
    </Box>
  );
}

// import type { BoxProps } from '@mui/material/Box';

// import { m } from 'framer-motion';

// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';

// import { CONFIG } from 'src/config-global';
// import { varAlpha, stylesMode } from 'src/theme/styles';

// import { SvgColor } from 'src/components/svg-color';
// import { varFade, MotionViewport } from 'src/components/animate';

// import { SectionTitle } from './components/section-title';
// import { CircleSvg, FloatLine, FloatPlusIcon } from './components/svg-elements';

// // ----------------------------------------------------------------------

// export function HomeMinimal({ sx, ...other }: BoxProps) {
//   const renderLines = (
//     <>
//       <FloatPlusIcon sx={{ top: 72, left: 72 }} />
//       <FloatPlusIcon sx={{ bottom: 72, left: 72 }} />
//       <FloatLine sx={{ top: 80, left: 0 }} />
//       <FloatLine sx={{ bottom: 80, left: 0 }} />
//       <FloatLine vertical sx={{ top: 0, left: 80 }} />
//     </>
//   );

//   const renderDescription = (
//     <>
//       <SectionTitle
//         caption="Visualizing Success"
//         title="What's in"
//         txtGradient="Minimal?"
//         sx={{ mb: { xs: 5, md: 8 }, textAlign: { xs: 'center', md: 'left' } }}
//       />

//       <Stack
//         spacing={6}
//         sx={{
//           maxWidth: { sm: 560, md: 400 },
//           mx: { xs: 'auto', md: 'unset' },
//         }}
//       >
//         {ITEMS.map((item) => (
//           <Box
//             component={m.div}
//             key={item.title}
//             variants={varFade({ distance: 24 }).inUp}
//             gap={3}
//             display="flex"
//           >
//             <SvgColor src={item.icon} sx={{ width: 40, height: 40 }} />
//             <Stack spacing={1}>
//               <Typography variant="h5" component="h6">
//                 {item.title}
//               </Typography>
//               <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
//             </Stack>
//           </Box>
//         ))}
//       </Stack>
//     </>
//   );

//   const renderImg = (
//     <Stack
//       component={m.div}
//       variants={varFade({ distance: 24 }).inRight}
//       alignItems="center"
//       justifyContent="center"
//       sx={{ height: 1, position: 'relative' }}
//     >
//       <Box
//         sx={{
//           left: 0,
//           width: 720,
//           borderRadius: 2,
//           position: 'absolute',
//           bgcolor: 'background.default',
//           boxShadow: (theme) =>
//             `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
//           [stylesMode.dark]: {
//             boxShadow: (theme) =>
//               `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.common.blackChannel, 0.16)}`,
//           },
//         }}
//       >
//         <Box
//           component="img"
//           alt="Home Chart"
//           src={`${CONFIG.assetsDir}/assets/images/home/home-chart.webp`}
//           sx={{ width: 720 }}
//         />
//       </Box>
//     </Stack>
//   );

//   return (
//     <Box
//       component="section"
//       sx={{
//         overflow: 'hidden',
//         position: 'relative',
//         py: { xs: 10, md: 20 },
//         ...sx,
//       }}
//       {...other}
//     >
//       <MotionViewport>
//         {renderLines}

//         <Container sx={{ position: 'relative' }}>
//           <Grid container columnSpacing={{ xs: 0, md: 8 }} sx={{ position: 'relative', zIndex: 9 }}>
//             <Grid xs={12} md={6} lg={7}>
//               {renderDescription}
//             </Grid>

//             <Grid md={6} lg={5} sx={{ display: { xs: 'none', md: 'block' } }}>
//               {renderImg}
//             </Grid>
//           </Grid>

//           <CircleSvg variants={varFade().in} sx={{ display: { xs: 'none', md: 'block' } }} />
//         </Container>
//       </MotionViewport>
//     </Box>
//   );
// }

// // ----------------------------------------------------------------------

// const ITEMS = [
//   {
//     icon: `${CONFIG.assetsDir}/assets/icons/home/ic-make-brand.svg`,
//     title: 'Branding',
//     description: 'Consistent design makes it easy to brand your own.',
//   },
//   {
//     icon: `${CONFIG.assetsDir}/assets/icons/home/ic-design.svg`,
//     title: 'UI & UX design',
//     description: 'The kit is built on the principles of the atomic design system.',
//   },
//   {
//     icon: `${CONFIG.assetsDir}/assets/icons/home/ic-development.svg`,
//     title: 'Development',
//     description: 'Easy to customize and extend, saving you time and money.',
//   },
// ];
