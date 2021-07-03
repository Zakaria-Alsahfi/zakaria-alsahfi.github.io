---
title: "Face Generation"
date: 2021-07-03
tags: [Data Science, Machine Learning, Deep Learning, Python]
header:
  image: "/images/perceptron/landmark-pic.png"
excerpt: "Data Science, Machine Learning, Deep Learning, Python"
mathjax: "true"
---


# Face Generation

In this project, we will define and train a DCGAN on a dataset of faces. Our goal is to get a generator network to generate *new* images of faces that look as realistic as possible!

The project will be broken down into a series of tasks from **loading in data to defining and training adversarial networks**. At the end of the notebook, we will be able to visualize the results of our trained Generator to see how it performs; our generated samples should look like fairly realistic faces with small amounts of noise.

### Get the Data
We will use [CelebFaces Attributes Dataset (CelebA)](http://mmlab.ie.cuhk.edu.hk/projects/CelebA.html) to train your adversarial networks.

### Pre-processed Data

Since the project's main focus is on building the GANs, we've done *some* of the pre-processing for you. Each of the CelebA images has been cropped to remove parts of the image that don't include a face, then resized down to 64x64x3 NumPy images. Some sample data is show below.

![png](/images/facegenration/processed_face_data.png)


## Visualize the CelebA Data

The [CelebA](http://mmlab.ie.cuhk.edu.hk/projects/CelebA.html) dataset contains over 200,000 celebrity images with annotations. Since we are going to be generating faces, we won't need the annotations, we will only need the images. Note that these are color images with [3 color channels (RGB)](https://en.wikipedia.org/wiki/Channel_(digital_image)#RGB_Images) each.


#### Load data 

```python
def get_dataloader(batch_size, image_size, data_dir='processed_celeba_small/'):
    """
    Batch the neural network data using DataLoader
    :param batch_size: The size of each batch; the number of images in a batch
    :param img_size: The square size of the image data (x, y)
    :param data_dir: Directory where image data is located
    :return: DataLoader with batched data
    """
    transform = transforms.Compose([ transforms.Resize(image_size),
                                    transforms.ToTensor()])
    
    my_dataset = datasets.ImageFolder(data_dir, transform = transform)
    
    # TODO: Implement function and return a dataloader
    data_loader = torch.utils.data.DataLoader(dataset = my_dataset, 
                                              batch_size = batch_size,
                                              shuffle = True)
    
    return data_loader
```

## Create a DataLoader

```python
# Call your function and get a dataloader
celeba_train_loader = get_dataloader(batch_size, img_size)

```

Next, we can view some images! we should seen square images of somewhat-centered faces.


```python
# obtain one batch of training images
dataiter = iter(celeba_train_loader)
images, _ = dataiter.next() # _ for no labels

# plot the images in the batch, along with the corresponding labels
fig = plt.figure(figsize=(20, 4))
plot_size=20
for idx in np.arange(plot_size):
    ax = fig.add_subplot(2, plot_size/2, idx+1, xticks=[], yticks=[])
    imshow(images[idx])
```

![png](/images/facegenration/output_9_1.png)
    


#### Pre-process your image data and scale it to a pixel range of -1 to 1

We need to do a bit of pre-processing; we know that the output of a `tanh` activated generator will contain pixel values in a range from -1 to 1, and so, we need to rescale our training images to a range of -1 to 1. (Right now, they are in a range from 0-1.)


```python
def scale(x, feature_range=(-1, 1)):
    ''' Scale takes in an image x and returns that image, scaled
       with a feature_range of pixel values from -1 to 1. 
       This function assumes that the input x is already scaled from 0-1.'''
    # assume x is scaled to (0, 1)
    # scale to feature_range and return scaled x
    min, max = feature_range
    x = x * (max - min) + min
    return x
```

```python
# check scaled range
# should be close to -1 to 1
img = images[0]
scaled_img = scale(img)

print('Min: ', scaled_img.min())
print('Max: ', scaled_img.max())
```

    Min:  tensor(-0.9294)
    Max:  tensor(1.)


---
# Define the Model

A GAN is comprised of two adversarial networks, a discriminator and a generator.

## Discriminator

Our first task will be to define the discriminator. This is a convolutional classifier without any maxpooling layers. To deal with this complex data, it's suggested we use a deep network with **normalization**.

```python
tests.test_discriminator(Discriminator)
```

    Tests Passed


## Generator

The generator should upsample an input and generate a *new* image of the same size as our training data `32x32x3`. This should be mostly transpose convolutional layers with normalization applied to the outputs.

```python
tests.test_generator(Generator)
```

    Tests Passed



## Initialize the weights of your networks

To help our models converge, we should initialize the weights of the convolutional and linear layers in our model. From reading the [original DCGAN paper](https://arxiv.org/pdf/1511.06434.pdf), they say:
> All weights were initialized from a zero-centered Normal distribution with standard deviation 0.02.

So, our next task will be to define a weight initialization function that does just this!


```python
def weights_init_normal(m):
    """
    Applies initial weights to certain layers in a model .
    The weights are taken from a normal distribution 
    with mean = 0, std dev = 0.02.
    :param m: A module or layer in a network    
    """
    # classname will be something like:
    # `Conv`, `BatchNorm2d`, `Linear`, etc.
    classname = m.__class__.__name__
    
    # Apply initial weights to convolutional and linear layers
    if hasattr(m, 'weight') and (classname.find('Conv') != -1 or classname.find('Linear') != -1):
        nn.init.normal(m.weight.data, 0.0, 0.2)
        
    if hasattr(m, 'bias') and m.bias is not None:
        nn.init.constant(m.bias.data, 0.0)
```

## Build complete network

Define our models' hyperparameters and instantiate the discriminator and generator. 

```python
def build_network(d_conv_dim, g_conv_dim, z_size):
    # define discriminator and generator
    D = Discriminator(d_conv_dim)
    G = Generator(z_size=z_size, conv_dim=g_conv_dim)

    # initialize model weights
    D.apply(weights_init_normal)
    G.apply(weights_init_normal)

    print(D)
    print()
    print(G)
    
    return D, G

```

```python
# Define model hyperparams
d_conv_dim = 32
g_conv_dim = 32
z_size = 100

D, G = build_network(d_conv_dim, g_conv_dim, z_size)
```

    Discriminator(
      (conv1): Sequential(
        (0): Conv2d(3, 32, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
      )
      (conv2): Sequential(
        (0): Conv2d(32, 64, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
        (1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (conv3): Sequential(
        (0): Conv2d(64, 128, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
        (1): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (fc): Linear(in_features=2048, out_features=1, bias=True)
    )
    
    Generator(
      (fc): Linear(in_features=100, out_features=2048, bias=True)
      (t_conv1): Sequential(
        (0): ConvTranspose2d(128, 64, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
        (1): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (t_conv2): Sequential(
        (0): ConvTranspose2d(64, 32, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
        (1): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
      )
      (t_conv3): Sequential(
        (0): ConvTranspose2d(32, 3, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
      )
    )


### Training on GPU

Check if we can train on GPU. Here, we'll set this as a boolean variable `train_on_gpu`.

```python
# Check for a GPU
train_on_gpu = torch.cuda.is_available()
if not train_on_gpu:
    print('No GPU found. Please use a GPU to train your neural network.')
else:
    print('Training on GPU!')
```

    No GPU found. Please use a GPU to train your neural network.


---
## Discriminator and Generator Losses

Now we need to calculate the losses for both types of adversarial networks.

### Discriminator Losses

> * For the discriminator, the total loss is the sum of the losses for real and fake images, `d_loss = d_real_loss + d_fake_loss`. 
* Remember that we want the discriminator to output 1 for real images and 0 for fake images, so we need to set up the losses to reflect that.


### Generator Loss

The generator loss will look similar only with flipped labels. The generator's goal is to get the discriminator to *think* its generated images are *real*.

```python
def real_loss(D_out):
    '''Calculates how close discriminator outputs are to being real.
       param, D_out: discriminator logits
       return: real loss'''
    batch_size = D_out.size(0)
    labels = torch.ones(batch_size)
    
    if train_on_gpu:
        labels = labels.cuda()

    criterion = nn.BCEWithLogitsLoss()
    loss = criterion(D_out.squeeze(), labels)
    
    return loss

def fake_loss(D_out):
    '''Calculates how close discriminator outputs are to being fake.
       param, D_out: discriminator logits
       return: fake loss'''
    batch_size = D_out.size(0)
    labels = torch.zeros(batch_size)
    
    if train_on_gpu:
        labels = labels.cuda()
        
    criterion = nn.BCEWithLogitsLoss()
    loss = criterion(D_out.squeeze(), labels) 
    return loss
```

## Optimizers

#### Define optimizers for our Discriminator (D) and Generator (G)

```python
# params
lr = 0.0002
beta1=0.5
beta2=0.999 # default value

# Create optimizers for the discriminator D and generator G
d_optimizer = optim.Adam(D.parameters(), lr, [beta1, beta2])
g_optimizer = optim.Adam(G.parameters(), lr, [beta1, beta2])
```

---
## Training

Training will involve alternating between training the discriminator and the generator. We will use our functions `real_loss` and `fake_loss` to help us calculate the discriminator losses.

* We should train the discriminator by alternating on real and fake images
* Then the generator, which tries to trick the discriminator and should have an opposing loss function


#### Saving Samples

```python
def train(D, G, n_epochs, print_every=50):
    '''Trains adversarial networks for some number of epochs
       param, D: the discriminator network
       param, G: the generator network
       param, n_epochs: number of epochs to train for
       param, print_every: when to print and record the models' losses
       return: D and G losses'''
    
    # move models to GPU
    if train_on_gpu:
        D.cuda()
        G.cuda()

    # keep track of loss and generated, "fake" samples
    samples = []
    losses = []

    # Get some fixed data for sampling. These are images that are held
    # constant throughout training, and allow us to inspect the model's performance
    sample_size=16
    fixed_z = np.random.uniform(-1, 1, size=(sample_size, z_size))
    fixed_z = torch.from_numpy(fixed_z).float()
    # move z to GPU if available
    if train_on_gpu:
        fixed_z = fixed_z.cuda()

    # epoch training loop
    for epoch in range(n_epochs):

        # batch training loop
        for batch_i, (real_images, _) in enumerate(celeba_train_loader):

            batch_size = real_images.size(0)
            real_images = scale(real_images)
            
            # 1. Train the discriminator on real and fake images
            d_optimizer.zero_grad()
            
            # Compute the discriminator losses on real images 
            if train_on_gpu:
                real_images = real_images.cuda()
                
            D_real = D(real_images)
            d_real_loss = real_loss(D_real)

            # Generate fake images
            z = np.random.uniform(-1, 1, size=(batch_size, z_size))
            z = torch.from_numpy(z).float()

            # move x to GPU, if available
            if train_on_gpu:
                z = z.cuda()
                
            fake_images = G(z)
            
            D_fake = D(fake_images)
            d_fake_loss = fake_loss(D_fake)
            # add up loss and perform backprop
            d_loss = d_real_loss + d_fake_loss
            d_loss.backward(retain_graph = True)
            d_optimizer.step()            
            
            # 2. Train the generator with an adversarial loss
            g_optimizer.zero_grad()
            
            # Compute the discriminator losses on fake images 
            # using flipped labels!
            D_fake = D(fake_images)
            g_loss = real_loss(D_fake) # use real loss to flip labels
        
            # perform backprop
            g_loss.backward()
            g_optimizer.step()

            # Print some loss stats
            if batch_i % print_every == 0:
                # append discriminator loss and generator loss
                losses.append((d_loss.item(), g_loss.item()))
                # print discriminator and generator loss
                print('Epoch [{:5d}/{:5d}] | d_loss: {:6.4f} | g_loss: {:6.4f}'.format(
                        epoch+1, n_epochs, d_loss.item(), g_loss.item()))


        ## AFTER EACH EPOCH##    
        # this code assumes your generator is named G, feel free to change the name
        # generate and save sample, fake images
        G.eval() # for generating samples
        with torch.no_grad():
            samples_z = G(fixed_z)
            samples_z = samples_z.detach().cpu()
            samples.append(samples_z)
        G.train() # back to training mode

    # Save training generator samples
    with open('train_samples.pkl', 'wb') as f:
        pkl.dump(samples, f)
    
    # finally return losses
    return losses
```

```python
# call training function
losses = train(D, G, n_epochs=n_epochs)
```

    Epoch [    1/   10] | d_loss: 7.0927 | g_loss: 0.6626
    Epoch [    1/   10] | d_loss: 0.9442 | g_loss: 5.4199
    Epoch [    1/   10] | d_loss: 0.4193 | g_loss: 5.6612
    Epoch [    1/   10] | d_loss: 0.5987 | g_loss: 5.7398
    Epoch [    1/   10] | d_loss: 0.2083 | g_loss: 6.9826
    Epoch [    1/   10] | d_loss: 0.2985 | g_loss: 7.4855
    Epoch [    1/   10] | d_loss: 0.1554 | g_loss: 7.0990
    Epoch [    1/   10] | d_loss: 0.1088 | g_loss: 7.9008
    Epoch [    1/   10] | d_loss: 0.0832 | g_loss: 7.6682
    Epoch [    1/   10] | d_loss: 0.1914 | g_loss: 7.9382
    Epoch [    1/   10] | d_loss: 0.0507 | g_loss: 7.8945
    Epoch [    1/   10] | d_loss: 0.1219 | g_loss: 7.1883
    Epoch [    1/   10] | d_loss: 0.1789 | g_loss: 7.5830
    Epoch [    1/   10] | d_loss: 0.0566 | g_loss: 7.9436
    Epoch [    1/   10] | d_loss: 0.1026 | g_loss: 7.8494
    Epoch [    2/   10] | d_loss: 0.0598 | g_loss: 6.9758
    Epoch [    2/   10] | d_loss: 0.0243 | g_loss: 7.9731
    Epoch [    2/   10] | d_loss: 0.0565 | g_loss: 8.1200
    Epoch [    2/   10] | d_loss: 0.0337 | g_loss: 7.0645
    Epoch [    2/   10] | d_loss: 0.0582 | g_loss: 7.2192
    Epoch [    2/   10] | d_loss: 0.0286 | g_loss: 6.7249
    Epoch [    2/   10] | d_loss: 0.0498 | g_loss: 6.8361
    Epoch [    2/   10] | d_loss: 0.0234 | g_loss: 6.9667
    Epoch [    2/   10] | d_loss: 0.0994 | g_loss: 6.4164
    Epoch [    2/   10] | d_loss: 0.0550 | g_loss: 6.7111
    Epoch [    2/   10] | d_loss: 0.0472 | g_loss: 6.4281
    Epoch [    2/   10] | d_loss: 0.0338 | g_loss: 6.4081
    Epoch [    2/   10] | d_loss: 0.0598 | g_loss: 5.2897
    Epoch [    2/   10] | d_loss: 0.1124 | g_loss: 4.9601
    Epoch [    2/   10] | d_loss: 0.0667 | g_loss: 6.6773
    Epoch [    3/   10] | d_loss: 0.1068 | g_loss: 5.0985
    Epoch [    3/   10] | d_loss: 0.1369 | g_loss: 5.9149
    Epoch [    3/   10] | d_loss: 0.0709 | g_loss: 6.4447
    Epoch [    3/   10] | d_loss: 0.0789 | g_loss: 6.3638
    Epoch [    3/   10] | d_loss: 0.2208 | g_loss: 4.6134
    Epoch [    3/   10] | d_loss: 0.1278 | g_loss: 4.8797
    Epoch [    3/   10] | d_loss: 0.1507 | g_loss: 5.5091
    Epoch [    3/   10] | d_loss: 0.1475 | g_loss: 5.4358
    Epoch [    3/   10] | d_loss: 0.1125 | g_loss: 5.1724
    Epoch [    3/   10] | d_loss: 0.1616 | g_loss: 3.9995
    Epoch [    3/   10] | d_loss: 0.1802 | g_loss: 5.3435
    Epoch [    3/   10] | d_loss: 0.4205 | g_loss: 5.2170
    Epoch [    3/   10] | d_loss: 0.2071 | g_loss: 4.4007
    Epoch [    3/   10] | d_loss: 0.2221 | g_loss: 5.0749
    Epoch [    3/   10] | d_loss: 0.1732 | g_loss: 4.2591
    Epoch [    4/   10] | d_loss: 0.2091 | g_loss: 4.5573
    Epoch [    4/   10] | d_loss: 0.3273 | g_loss: 3.8592
    Epoch [    4/   10] | d_loss: 0.2161 | g_loss: 5.0266
    Epoch [    4/   10] | d_loss: 0.2302 | g_loss: 4.1546
    Epoch [    4/   10] | d_loss: 0.3926 | g_loss: 4.5310
    Epoch [    4/   10] | d_loss: 0.2889 | g_loss: 3.3865
    Epoch [    4/   10] | d_loss: 0.1797 | g_loss: 4.4208
    Epoch [    4/   10] | d_loss: 0.5696 | g_loss: 5.7740
    Epoch [    4/   10] | d_loss: 0.1816 | g_loss: 4.0264
    Epoch [    4/   10] | d_loss: 0.2239 | g_loss: 4.5109
    Epoch [    4/   10] | d_loss: 0.3582 | g_loss: 3.3270
    Epoch [    4/   10] | d_loss: 0.1923 | g_loss: 4.3978
    Epoch [    4/   10] | d_loss: 0.3060 | g_loss: 4.6238
    Epoch [    4/   10] | d_loss: 0.1997 | g_loss: 3.9803
    Epoch [    4/   10] | d_loss: 0.1672 | g_loss: 4.5041
    Epoch [    5/   10] | d_loss: 0.3888 | g_loss: 2.6291
    Epoch [    5/   10] | d_loss: 0.3604 | g_loss: 3.2332
    Epoch [    5/   10] | d_loss: 0.2867 | g_loss: 3.3746
    Epoch [    5/   10] | d_loss: 0.6202 | g_loss: 2.3096
    Epoch [    5/   10] | d_loss: 0.1544 | g_loss: 4.0854
    Epoch [    5/   10] | d_loss: 0.4241 | g_loss: 2.8162
    Epoch [    5/   10] | d_loss: 0.3935 | g_loss: 3.7505
    Epoch [    5/   10] | d_loss: 0.2994 | g_loss: 3.4092
    Epoch [    5/   10] | d_loss: 0.2414 | g_loss: 3.8349
    Epoch [    5/   10] | d_loss: 0.2920 | g_loss: 4.1832
    Epoch [    5/   10] | d_loss: 0.5150 | g_loss: 2.9612
    Epoch [    5/   10] | d_loss: 0.5356 | g_loss: 2.3495
    Epoch [    5/   10] | d_loss: 0.5587 | g_loss: 3.1931
    Epoch [    5/   10] | d_loss: 0.7705 | g_loss: 1.9879
    Epoch [    5/   10] | d_loss: 0.6632 | g_loss: 2.8642
    Epoch [    6/   10] | d_loss: 0.6520 | g_loss: 2.8420
    Epoch [    6/   10] | d_loss: 0.7839 | g_loss: 2.6046
    Epoch [    6/   10] | d_loss: 0.8524 | g_loss: 2.8597
    Epoch [    6/   10] | d_loss: 0.9864 | g_loss: 1.6504
    Epoch [    6/   10] | d_loss: 0.7604 | g_loss: 2.7355
    Epoch [    6/   10] | d_loss: 0.5209 | g_loss: 2.2429
    Epoch [    6/   10] | d_loss: 0.5817 | g_loss: 2.5012
    Epoch [    6/   10] | d_loss: 0.5701 | g_loss: 3.0165
    Epoch [    6/   10] | d_loss: 0.6059 | g_loss: 3.9070
    Epoch [    6/   10] | d_loss: 0.6497 | g_loss: 2.8697
    Epoch [    6/   10] | d_loss: 0.7901 | g_loss: 2.8571
    Epoch [    6/   10] | d_loss: 0.5617 | g_loss: 2.9959
    Epoch [    6/   10] | d_loss: 0.6405 | g_loss: 2.3220
    Epoch [    6/   10] | d_loss: 0.9629 | g_loss: 2.3714
    Epoch [    6/   10] | d_loss: 0.8315 | g_loss: 2.5846
    Epoch [    7/   10] | d_loss: 0.7347 | g_loss: 2.4565
    Epoch [    7/   10] | d_loss: 0.5589 | g_loss: 2.5774
    Epoch [    7/   10] | d_loss: 0.6913 | g_loss: 3.1963
    Epoch [    7/   10] | d_loss: 0.5589 | g_loss: 3.4209
    Epoch [    7/   10] | d_loss: 0.9340 | g_loss: 1.9932
    Epoch [    7/   10] | d_loss: 0.6815 | g_loss: 2.1564
    Epoch [    7/   10] | d_loss: 0.6634 | g_loss: 2.4684
    Epoch [    7/   10] | d_loss: 0.8868 | g_loss: 2.0232
    Epoch [    7/   10] | d_loss: 0.5956 | g_loss: 2.7371
    Epoch [    7/   10] | d_loss: 0.8329 | g_loss: 2.0274
    Epoch [    7/   10] | d_loss: 0.7473 | g_loss: 2.2113
    Epoch [    7/   10] | d_loss: 0.7190 | g_loss: 3.0775
    Epoch [    7/   10] | d_loss: 0.9573 | g_loss: 2.3080
    Epoch [    7/   10] | d_loss: 1.3531 | g_loss: 1.6815
    Epoch [    7/   10] | d_loss: 0.7135 | g_loss: 2.4932
    Epoch [    8/   10] | d_loss: 0.8314 | g_loss: 2.4774
    Epoch [    8/   10] | d_loss: 1.0232 | g_loss: 1.9796
    Epoch [    8/   10] | d_loss: 0.9445 | g_loss: 1.8432
    Epoch [    8/   10] | d_loss: 0.5887 | g_loss: 2.2623
    Epoch [    8/   10] | d_loss: 0.7063 | g_loss: 2.2172
    Epoch [    8/   10] | d_loss: 0.8429 | g_loss: 2.1662
    Epoch [    8/   10] | d_loss: 1.0157 | g_loss: 1.9869
    Epoch [    8/   10] | d_loss: 0.8982 | g_loss: 1.8878
    Epoch [    8/   10] | d_loss: 0.7977 | g_loss: 1.6259
    Epoch [    8/   10] | d_loss: 0.9514 | g_loss: 2.0169
    Epoch [    8/   10] | d_loss: 0.9395 | g_loss: 2.2418
    Epoch [    8/   10] | d_loss: 1.0007 | g_loss: 1.6658
    Epoch [    8/   10] | d_loss: 1.1481 | g_loss: 1.3643
    Epoch [    8/   10] | d_loss: 1.2910 | g_loss: 1.3578
    Epoch [    8/   10] | d_loss: 0.8039 | g_loss: 1.8700
    Epoch [    9/   10] | d_loss: 0.8161 | g_loss: 1.9920
    Epoch [    9/   10] | d_loss: 1.0879 | g_loss: 1.5742
    Epoch [    9/   10] | d_loss: 0.9099 | g_loss: 1.6716
    Epoch [    9/   10] | d_loss: 1.0082 | g_loss: 1.7884
    Epoch [    9/   10] | d_loss: 0.9952 | g_loss: 1.6515
    Epoch [    9/   10] | d_loss: 0.9404 | g_loss: 1.6506
    Epoch [    9/   10] | d_loss: 1.1282 | g_loss: 1.3377
    Epoch [    9/   10] | d_loss: 0.6694 | g_loss: 1.6836
    Epoch [    9/   10] | d_loss: 1.2498 | g_loss: 1.3742
    Epoch [    9/   10] | d_loss: 0.4692 | g_loss: 2.5199
    Epoch [    9/   10] | d_loss: 0.8429 | g_loss: 1.6558
    Epoch [    9/   10] | d_loss: 1.1404 | g_loss: 1.8746
    Epoch [    9/   10] | d_loss: 1.2318 | g_loss: 1.6067
    Epoch [    9/   10] | d_loss: 0.9201 | g_loss: 1.6246
    Epoch [    9/   10] | d_loss: 0.9402 | g_loss: 1.4206
    Epoch [   10/   10] | d_loss: 0.8460 | g_loss: 1.6875
    Epoch [   10/   10] | d_loss: 1.2213 | g_loss: 1.1053
    Epoch [   10/   10] | d_loss: 1.2034 | g_loss: 1.7514
    Epoch [   10/   10] | d_loss: 0.7024 | g_loss: 1.9776
    Epoch [   10/   10] | d_loss: 0.6356 | g_loss: 2.1592
    Epoch [   10/   10] | d_loss: 0.9740 | g_loss: 1.1679
    Epoch [   10/   10] | d_loss: 0.6166 | g_loss: 2.0685
    Epoch [   10/   10] | d_loss: 1.1605 | g_loss: 1.1341
    Epoch [   10/   10] | d_loss: 0.9933 | g_loss: 1.5521
    Epoch [   10/   10] | d_loss: 0.9142 | g_loss: 1.3034
    Epoch [   10/   10] | d_loss: 1.0661 | g_loss: 1.3157
    Epoch [   10/   10] | d_loss: 0.8386 | g_loss: 1.9045
    Epoch [   10/   10] | d_loss: 0.8447 | g_loss: 2.1522
    Epoch [   10/   10] | d_loss: 0.9914 | g_loss: 1.5608
    Epoch [   10/   10] | d_loss: 1.0423 | g_loss: 1.5981


## Training loss

Plot the training losses for the generator and discriminator, recorded after each epoch.


```python
fig, ax = plt.subplots()
losses = np.array(losses)
plt.plot(losses.T[0], label='Discriminator', alpha=0.5)
plt.plot(losses.T[1], label='Generator', alpha=0.5)
plt.title("Training Losses")
plt.legend()
```

![png](/images/facegenration/output_36_1.png)
    


## Generator samples from training

View samples of images from the generator.

```python
_ = view_samples(-1, samples)
```

![png](/images/facegenration/output_40_0.png)
    

The generated faces appear that one or two skin colors are mixed. So if we categorized dataset as per skin color, or sex. It seems that hair impact much on face, so we should consider it, also, when we categorize dataset of face.

Model size is good as output face picture size is small 32x32, unfortunately, most of face picture don’t have its chin, so I couldn’t see how chin impact on whole face.

Initially, I’ve started with 20 epoch, as I checked losses, it seems that it is good to do early stopping at around 7 epoch, to save training time.
