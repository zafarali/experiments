#include <stdio.h>
#include "reference_calc.cpp"
#include "utils.h"

//Introuction to Parallel Programming (Problem Set 1)
//goal: convert image from color to black and white

// How do we store pixel colors?
// RGB channels: 0 - color absent, 255 - color is completely present
// each pixel is stored as struct unsigned char 4 with
// unsigned char x, y, z, w property. w=alpha (transparency)

// How to represent color in black and white?
// (1) Intensity = (R + G + B) / 3
// Taking into account sensitivities of our eyes
// (2) Intensity = 0.299f * R + 0.589f * G + 0.144f * B

__global__ void rgba_to_grayscale(cost uchar* const rgbaImage,
                                  unsigned char* const grayImage,
                                 int numRows, int numCols){
    
}

void your_rgba_to_grayscale(const uchar* const h_rgbaImage, uchar4 * const d_rgba_image,
                           unsigned char* const d_grayImage, size_t numRows, size_t numCols) {
    const dim3 blocksize(1, 1, 1);
    const dim3 gridsize(1, 1, 1);
    
    rgba_to_grayscale<<<gridsize, blocksize>>>(d_rgba_image, d_grayImage, numRows, numCols);
    
    cudaDeviceSynchronize();
    checkCudaErrors(cudaGetLastError());
}